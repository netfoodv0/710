/**
 * Script de Migração de Dados - Vault v2
 * Migra dados da estrutura antiga para a nova estrutura escalável
 * 
 * ESTRUTURA ANTIGA: /colecao/{docId}
 * ESTRUTURA NOVA:  /lojas/{lojaId}/colecao/{docId}
 */

const admin = require('firebase-admin');
const fs = require('fs');

// Configuração do Firebase Admin
const serviceAccount = require('./service-account-key.json'); // Adicionar sua chave de serviço

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://vault-v2-ef6d6.firebaseio.com"
});

const db = admin.firestore();

// Configurações de migração
const BATCH_SIZE = 500; // Tamanho do lote para operações em lote
const DELAY_BETWEEN_BATCHES = 1000; // Delay entre lotes (ms)

// Coleções para migrar
const COLLECTIONS_TO_MIGRATE = [
  'produtos',
  'pedidos', 
  'operadores',
  'motoboys',
  'cupons',
  'clientes',
  'categorias',
  'categoriasProdutos',
  'categoriasAdicionais'
];

// Log de migração
const migrationLog = {
  startTime: new Date(),
  collections: {},
  errors: [],
  summary: {}
};

/**
 * Função principal de migração
 */
async function migrarDados() {
  console.log('🚀 Iniciando migração de dados...');
  console.log(`📅 Data: ${migrationLog.startTime.toISOString()}`);
  
  try {
    // 1. Buscar todas as lojas
    console.log('📋 Buscando lojas...');
    const lojas = await buscarLojas();
    console.log(`✅ Encontradas ${lojas.length} lojas`);
    
    // 2. Migrar cada coleção para cada loja
    for (const loja of lojas) {
      console.log(`\n🏪 Migrando dados da loja: ${loja.id}`);
      
      for (const collectionName of COLLECTIONS_TO_MIGRATE) {
        await migrarColecao(loja.id, collectionName);
      }
    }
    
    // 3. Gerar relatório final
    await gerarRelatorio();
    
    console.log('\n✅ Migração concluída com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro durante a migração:', error);
    migrationLog.errors.push({
      type: 'MIGRATION_ERROR',
      message: error.message,
      timestamp: new Date()
    });
  }
}

/**
 * Busca todas as lojas do sistema
 */
async function buscarLojas() {
  const lojasSnapshot = await db.collection('lojas').get();
  return lojasSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

/**
 * Migra uma coleção específica para uma loja
 */
async function migrarColecao(lojaId, collectionName) {
  console.log(`  📦 Migrando coleção: ${collectionName}`);
  
  try {
    // Buscar todos os documentos da coleção antiga
    const oldCollectionRef = db.collection(collectionName);
    const querySnapshot = await oldCollectionRef
      .where('lojaId', '==', lojaId)
      .get();
    
    if (querySnapshot.empty) {
      console.log(`    ⚠️  Nenhum documento encontrado para ${collectionName}`);
      return;
    }
    
    console.log(`    📊 Encontrados ${querySnapshot.docs.length} documentos`);
    
    // Processar em lotes
    const docs = querySnapshot.docs;
    let processedCount = 0;
    
    for (let i = 0; i < docs.length; i += BATCH_SIZE) {
      const batch = db.batch();
      const batchDocs = docs.slice(i, i + BATCH_SIZE);
      
      for (const doc of batchDocs) {
        const newDocRef = db.collection('lojas').doc(lojaId).collection(collectionName).doc(doc.id);
        
        // Preparar dados para migração
        const data = doc.data();
        const migratedData = prepararDadosParaMigracao(data, collectionName);
        
        batch.set(newDocRef, migratedData);
        processedCount++;
      }
      
      // Executar lote
      await batch.commit();
      console.log(`    ✅ Processados ${processedCount}/${docs.length} documentos`);
      
      // Delay entre lotes para evitar rate limiting
      if (i + BATCH_SIZE < docs.length) {
        await delay(DELAY_BETWEEN_BATCHES);
      }
    }
    
    // Atualizar log
    migrationLog.collections[collectionName] = {
      lojaId,
      totalDocuments: docs.length,
      processedDocuments: processedCount,
      status: 'SUCCESS'
    };
    
    console.log(`    ✅ Coleção ${collectionName} migrada com sucesso`);
    
  } catch (error) {
    console.error(`    ❌ Erro ao migrar ${collectionName}:`, error.message);
    
    migrationLog.collections[collectionName] = {
      lojaId,
      status: 'ERROR',
      error: error.message
    };
    
    migrationLog.errors.push({
      type: 'COLLECTION_ERROR',
      collection: collectionName,
      lojaId,
      message: error.message,
      timestamp: new Date()
    });
  }
}

/**
 * Prepara dados para migração, removendo campos desnecessários
 */
function prepararDadosParaMigracao(data, collectionName) {
  // Remover lojaId pois agora está implícito na estrutura
  const { lojaId, ...migratedData } = data;
  
  // Adicionar metadados de migração
  migratedData.migratedAt = admin.firestore.Timestamp.now();
  migratedData.migrationVersion = '2.0.0';
  
  // Ajustes específicos por coleção
  switch (collectionName) {
    case 'produtos':
      // Garantir campos obrigatórios
      if (!migratedData.status) migratedData.status = 'ativo';
      if (!migratedData.dataCriacao) migratedData.dataCriacao = admin.firestore.Timestamp.now();
      if (!migratedData.dataAtualizacao) migratedData.dataAtualizacao = admin.firestore.Timestamp.now();
      break;
      
    case 'pedidos':
      // Garantir campos obrigatórios
      if (!migratedData.dataHora) migratedData.dataHora = admin.firestore.Timestamp.now();
      if (!migratedData.status) migratedData.status = 'pendente';
      break;
      
    case 'operadores':
    case 'motoboys':
      // Garantir campos obrigatórios
      if (!migratedData.status) migratedData.status = 'ativo';
      if (!migratedData.dataCriacao) migratedData.dataCriacao = admin.firestore.Timestamp.now();
      if (!migratedData.dataAtualizacao) migratedData.dataAtualizacao = admin.firestore.Timestamp.now();
      break;
      
    case 'cupons':
      // Garantir campos obrigatórios
      if (!migratedData.ativo) migratedData.ativo = true;
      if (!migratedData.dataCriacao) migratedData.dataCriacao = admin.firestore.Timestamp.now();
      if (!migratedData.dataAtualizacao) migratedData.dataAtualizacao = admin.firestore.Timestamp.now();
      break;
  }
  
  return migratedData;
}

/**
 * Gera relatório final da migração
 */
async function gerarRelatorio() {
  const endTime = new Date();
  const duration = endTime - migrationLog.startTime;
  
  migrationLog.endTime = endTime;
  migrationLog.duration = duration;
  
  // Calcular estatísticas
  const totalCollections = Object.keys(migrationLog.collections).length;
  const successfulCollections = Object.values(migrationLog.collections)
    .filter(c => c.status === 'SUCCESS').length;
  const failedCollections = totalCollections - successfulCollections;
  
  migrationLog.summary = {
    totalCollections,
    successfulCollections,
    failedCollections,
    totalErrors: migrationLog.errors.length,
    duration: `${Math.round(duration / 1000)}s`
  };
  
  // Salvar log em arquivo
  const logFileName = `migration-log-${Date.now()}.json`;
  fs.writeFileSync(logFileName, JSON.stringify(migrationLog, null, 2));
  
  console.log('\n📊 RELATÓRIO DE MIGRAÇÃO:');
  console.log(`⏱️  Duração: ${migrationLog.summary.duration}`);
  console.log(`📦 Coleções processadas: ${migrationLog.summary.totalCollections}`);
  console.log(`✅ Sucessos: ${migrationLog.summary.successfulCollections}`);
  console.log(`❌ Falhas: ${migrationLog.summary.failedCollections}`);
  console.log(`🐛 Erros: ${migrationLog.summary.totalErrors}`);
  console.log(`📄 Log salvo em: ${logFileName}`);
  
  if (migrationLog.errors.length > 0) {
    console.log('\n❌ ERROS ENCONTRADOS:');
    migrationLog.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error.type}: ${error.message}`);
    });
  }
}

/**
 * Função auxiliar para delay
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Função para validar migração
 */
async function validarMigracao() {
  console.log('🔍 Validando migração...');
  
  const lojas = await buscarLojas();
  let totalValidated = 0;
  let totalErrors = 0;
  
  for (const loja of lojas) {
    console.log(`\n🏪 Validando loja: ${loja.id}`);
    
    for (const collectionName of COLLECTIONS_TO_MIGRATE) {
      try {
        // Contar documentos na coleção antiga
        const oldCount = await db.collection(collectionName)
          .where('lojaId', '==', loja.id)
          .get()
          .then(snapshot => snapshot.size);
        
        // Contar documentos na nova estrutura
        const newCount = await db.collection('lojas')
          .doc(loja.id)
          .collection(collectionName)
          .get()
          .then(snapshot => snapshot.size);
        
        console.log(`  ${collectionName}: ${oldCount} → ${newCount} ${oldCount === newCount ? '✅' : '❌'}`);
        
        if (oldCount !== newCount) {
          totalErrors++;
          console.log(`    ⚠️  Contagem não confere para ${collectionName}`);
        }
        
        totalValidated++;
        
      } catch (error) {
        console.error(`    ❌ Erro ao validar ${collectionName}:`, error.message);
        totalErrors++;
      }
    }
  }
  
  console.log(`\n📊 Validação concluída: ${totalValidated} coleções verificadas, ${totalErrors} erros encontrados`);
}

// Executar migração se chamado diretamente
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--validate')) {
    validarMigracao().then(() => process.exit(0));
  } else {
    migrarDados().then(() => process.exit(0));
  }
}

module.exports = {
  migrarDados,
  validarMigracao
};




