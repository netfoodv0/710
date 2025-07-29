import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2I0Cy3olXowdUmDRFIKoqMS6Tgy4PqPQ",
  authDomain: "vault-v2-ef6d6.firebaseapp.com",
  projectId: "vault-v2-ef6d6",
  storageBucket: "vault-v2-ef6d6.firebasestorage.app",
  messagingSenderId: "848566827539",
  appId: "1:848566827539:web:9004fa618db6534501dde6",
  measurementId: "G-ZELND5C5HC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

// ✅ MELHORIA: Analytics será inicializado via hook useAnalytics
// para evitar erros em ambientes não suportados

export default app; 