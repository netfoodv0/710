import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { environment, shouldUseEmulators, isProduction } from "../config/environment";

const firebaseConfig = environment.firebase;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// Verificar se a inicialização foi bem-sucedida
if (!app) {
  throw new Error('Falha ao inicializar Firebase App');
}

if (!db) {
  throw new Error('Falha ao inicializar Firestore');
}

if (!auth) {
  throw new Error('Falha ao inicializar Auth');
}

console.log('✅ Firebase inicializado com sucesso');
console.log('🔧 App:', app.name);
console.log('📊 Firestore:', db ? 'OK' : 'ERRO');
console.log('🔐 Auth:', auth ? 'OK' : 'ERRO');

// Conectar a emuladores APENAS se explicitamente configurado
if (shouldUseEmulators()) {
  try {
    // Emulador do Firestore (porta padrão: 8080)
    connectFirestoreEmulator(db, 'localhost', 8080);
    console.log('🔧 Conectado ao emulador do Firestore');
  } catch (error) {
    console.log('ℹ️ Emulador do Firestore não disponível, usando produção');
  }

  try {
    // Emulador do Auth (porta padrão: 9099)
    connectAuthEmulator(auth, 'http://localhost:9099');
    console.log('🔧 Conectado ao emulador do Auth');
  } catch (error) {
    console.log('ℹ️ Emulador do Auth não disponível, usando produção');
  }
} else {
  if (isProduction()) {
    console.log('🚀 Firebase configurado para PRODUÇÃO');
  } else {
    console.log('🔧 Firebase configurado para DESENVOLVIMENTO (sem emuladores)');
  }
}

// ✅ MELHORIA: Analytics será inicializado via hook useAnalytics
// para evitar erros em ambientes não suportados

export default app; 