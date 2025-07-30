import { 
  collection, 
  getDocs, 
  updateDoc, 
  doc, 
  writeBatch,
  query,
  where 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

/**
 * Utilitários para migração de dados existentes
 * Adiciona campo lojaId aos documentos existentes
 */

export class MigrationUtils {
  /**
   * Migra produtos existentes adicionando lojaId
   */
  static async migrateProdutos() {
    try {
      console.log('Iniciando migração de produtos...');
      
      const produtosRef = collection(db, 'produtos');
      const snapshot = await getDocs(produtosRef);
      
      const batch = writeBatch(db);
      let updatedCount = 0;
      
      snapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        
        // Se não tem lojaId, usar restauranteId ou criar baseado no documento
        if (!data.lojaId) {
          const lojaId = data.restauranteId || docSnapshot.id;
          
          batch.update(docSnapshot.ref, {
            lojaId,
            dataAtualizacao: new Date()
          });
          
          updatedCount++;
        }
      });
      
      if (updatedCount > 0) {
        await batch.commit();
        console.log(`Migração concluída: ${updatedCount} produtos atualizados`);
      } else {
        console.log('Nenhum produto precisa ser migrado');
      }
    } catch (error) {
      console.error('Erro na migração de produtos:', error);
      throw error;
    }
  }

  /**
   * Migra categorias existentes adicionando lojaId
   */
  static async migrateCategorias() {
    try {
      console.log('Iniciando migração de categorias...');
      
      const categoriasRef = collection(db, 'categorias');
      const snapshot = await getDocs(categoriasRef);
      
      const batch = writeBatch(db);
      let updatedCount = 0;
      
      snapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        
        // Se não tem lojaId, usar restauranteId ou criar baseado no documento
        if (!data.lojaId) {
          const lojaId = data.restauranteId || docSnapshot.id;
          
          batch.update(docSnapshot.ref, {
            lojaId,
            dataAtualizacao: new Date()
          });
          
          updatedCount++;
        }
      });
      
      if (updatedCount > 0) {
        await batch.commit();
        console.log(`Migração concluída: ${updatedCount} categorias atualizadas`);
      } else {
        console.log('Nenhuma categoria precisa ser migrada');
      }
    } catch (error) {
      console.error('Erro na migração de categorias:', error);
      throw error;
    }
  }

  /**
   * Migra pedidos existentes adicionando lojaId
   */
  static async migratePedidos() {
    try {
      console.log('Iniciando migração de pedidos...');
      
      const pedidosRef = collection(db, 'pedidos');
      const snapshot = await getDocs(pedidosRef);
      
      const batch = writeBatch(db);
      let updatedCount = 0;
      
      snapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        
        // Se não tem lojaId, tentar inferir do contexto ou usar ID do documento
        if (!data.lojaId) {
          const lojaId = data.restauranteId || data.lojaId || docSnapshot.id;
          
          batch.update(docSnapshot.ref, {
            lojaId,
            dataAtualizacao: new Date()
          });
          
          updatedCount++;
        }
      });
      
      if (updatedCount > 0) {
        await batch.commit();
        console.log(`Migração concluída: ${updatedCount} pedidos atualizados`);
      } else {
        console.log('Nenhum pedido precisa ser migrado');
      }
    } catch (error) {
      console.error('Erro na migração de pedidos:', error);
      throw error;
    }
  }

  /**
   * Executa todas as migrações
   */
  static async runAllMigrations() {
    try {
      console.log('Iniciando migração completa...');
      
      await this.migrateProdutos();
      await this.migrateCategorias();
      await this.migratePedidos();
      
      console.log('Migração completa finalizada com sucesso!');
    } catch (error) {
      console.error('Erro na migração completa:', error);
      throw error;
    }
  }

  /**
   * Verifica se há documentos sem lojaId
   */
  static async checkMissingLojaId() {
    try {
      const collections = ['produtos', 'categorias', 'pedidos'];
      const results: Record<string, number> = {};
      
      for (const collectionName of collections) {
        const ref = collection(db, collectionName);
        const snapshot = await getDocs(ref);
        
        let missingCount = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (!data.lojaId) {
            missingCount++;
          }
        });
        
        results[collectionName] = missingCount;
      }
      
      return results;
    } catch (error) {
      console.error('Erro ao verificar documentos sem lojaId:', error);
      throw error;
    }
  }
} 