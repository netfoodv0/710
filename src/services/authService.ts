import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import type {
  Usuario,
  Loja,
  LoginFormData,
  CadastroLojaFormData,
  CadastroUsuarioFormData
} from '../types/auth';

export class AuthService {
  // Login do usuário
  static async login(data: LoginFormData): Promise<Usuario> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.senha
      );

      const user = userCredential.user;
      
      // Buscar dados do usuário no Firestore
      const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
      
      if (!userDoc.exists()) {
        throw new Error('Usuário não encontrado');
      }

      const userData = userDoc.data() as Usuario;
      
      // Atualizar último login
      await updateDoc(doc(db, 'usuarios', user.uid), {
        ultimoLogin: new Date()
      });

      return {
        ...userData,
        ultimoLogin: new Date()
      };
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        throw new Error('Usuário não encontrado');
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Senha incorreta');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('E-mail inválido');
      } else {
        throw new Error('Erro ao fazer login: ' + error.message);
      }
    }
  }

  // Cadastro de usuário e loja
  static async cadastrarLoja(data: CadastroLojaFormData): Promise<{ usuario: Usuario; loja: Loja }> {
    try {
      console.log('Iniciando cadastro com dados:', {
        email: data.email,
        nomeLoja: data.nomeLoja,
        whatsapp: data.whatsapp,
        segmento: data.segmento
      });

      // Criar usuário no Firebase Auth
      console.log('Criando usuário no Firebase Auth...');
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.senha
      );
      console.log('Usuário criado no Firebase Auth:', userCredential.user.uid);

      const user = userCredential.user;

      // Remover verificação de e-mail duplicado por enquanto
      // (Isso evita problemas de permissão durante o cadastro)
      // TODO: Implementar verificação de e-mail duplicado de forma mais eficiente

      // Criar dados do usuário
      const usuarioData: Usuario = {
        uid: user.uid,
        email: data.email,
        dataCriacao: new Date(),
        ultimoLogin: new Date()
      };

      // Criar dados da loja
      const lojaData: Loja = {
        id: user.uid, // Usar UID do usuário como ID da loja
        nomeLoja: data.nomeLoja,
        whatsapp: data.whatsapp,
        segmento: data.segmento,
        email: data.email,
        endereco: data.endereco,
        dataCriacao: new Date(),
        ativa: true
      };

      // Salvar dados no Firestore
      console.log('Salvando dados do usuário no Firestore...');
      console.log('Dados do usuário:', usuarioData);
      console.log('Dados da loja:', lojaData);
      
      await Promise.all([
        setDoc(doc(db, 'usuarios', user.uid), usuarioData),
        setDoc(doc(db, 'lojas', user.uid), lojaData)
      ]);
      
      console.log('Dados salvos com sucesso no Firestore');

      return {
        usuario: usuarioData,
        loja: lojaData
      };
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      console.error('Código do erro:', error.code);
      console.error('Mensagem do erro:', error.message);
      
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Este e-mail já está em uso');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('A senha deve ter pelo menos 6 caracteres');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('E-mail inválido');
      } else if (error.code === 'auth/operation-not-allowed') {
        throw new Error('Operação não permitida. Verifique as configurações do Firebase');
      } else {
        throw new Error('Erro ao criar conta: ' + error.message);
      }
    }
  }

  // Logout
  static async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error('Erro ao fazer logout: ' + error.message);
    }
  }

  // Buscar dados do usuário atual
  static async getCurrentUser(): Promise<Usuario | null> {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log('Nenhum usuário Firebase logado');
        return null;
      }

      console.log('Buscando dados do usuário:', user.uid);
      const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
      
      if (!userDoc.exists()) {
        console.log('Documento do usuário não encontrado no Firestore');
        return null;
      }

      const userData = userDoc.data() as Usuario;
      console.log('Dados do usuário encontrados:', userData);
      return userData;
    } catch (error) {
      console.error('Erro ao buscar usuário atual:', error);
      return null;
    }
  }

  // Buscar dados da loja atual
  static async getCurrentLoja(): Promise<Loja | null> {
    try {
      const user = auth.currentUser;
      if (!user) return null;

      const lojaDoc = await getDoc(doc(db, 'lojas', user.uid));
      
      if (!lojaDoc.exists()) {
        return null;
      }

      return lojaDoc.data() as Loja;
    } catch (error) {
      console.error('Erro ao buscar loja atual:', error);
      return null;
    }
  }

  // Listener para mudanças de autenticação
  static onAuthStateChanged(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, callback);
  }

  // Atualizar dados da loja
  static async updateLoja(lojaId: string, data: Partial<Loja>): Promise<void> {
    try {
      await updateDoc(doc(db, 'lojas', lojaId), {
        ...data,
        dataAtualizacao: new Date()
      });
    } catch (error: any) {
      throw new Error('Erro ao atualizar dados da loja: ' + error.message);
    }
  }

  // Verificar se e-mail já está em uso
  static async checkEmailExists(email: string): Promise<boolean> {
    try {
      const lojasRef = collection(db, 'lojas');
      const q = query(lojasRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Erro ao verificar e-mail:', error);
      return false;
    }
  }
} 