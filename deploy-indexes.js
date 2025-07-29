const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Deploying Firestore indexes...');

try {
  // Verificar se o Firebase CLI está instalado
  execSync('firebase --version', { stdio: 'pipe' });
  
  // Fazer deploy dos índices
  execSync('firebase deploy --only firestore:indexes', { stdio: 'inherit' });
  
  console.log('✅ Firestore indexes deployed successfully!');
} catch (error) {
  console.error('❌ Error deploying indexes:', error.message);
  console.log('\n📋 To deploy indexes manually:');
  console.log('1. Install Firebase CLI: npm install -g firebase-tools');
  console.log('2. Login: firebase login');
  console.log('3. Deploy indexes: firebase deploy --only firestore:indexes');
} 