const { execSync } = require('child_process');

console.log('🚀 Implantando índices do Firestore...');

try {
  // Implantar índices
  execSync('firebase deploy --only firestore:indexes', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });
  
  console.log('✅ Índices implantados com sucesso!');
  console.log('📝 Aguarde alguns minutos para os índices ficarem ativos...');
  
} catch (error) {
  console.error('❌ Erro ao implantar índices:', error.message);
  console.log('💡 Certifique-se de estar logado no Firebase:');
  console.log('   firebase login');
  console.log('💡 Ou execute manualmente:');
  console.log('   firebase deploy --only firestore:indexes');
} 