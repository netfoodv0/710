import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
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
  CadastroLojaFormData,
  LoginFormData
} from '../types/global/auth';

export class AuthService {
  // Cadastro de usuário e loja
  static async cadastrarLoja(data: CadastroLojaFormData): Promise<{ usuario: Usuario; loja: Loja }> {
    try {
      if ((await import('../config/environment')).environment.app.debug) console.log('Iniciando cadastro com dados:', {
        email: data.email,
        nomeLoja: data.nomeLoja,
        whatsapp: data.whatsapp,
        segmento: data.segmento
      });

      // Criar usuário no Firebase Auth
      if ((await import('../config/environment')).environment.app.debug) console.log('Criando usuário no Firebase Auth...');
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.senha
      );
      if ((await import('../config/environment')).environment.app.debug) console.log('Usuário criado no Firebase Auth:', userCredential.user.uid);

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
      if ((await import('../config/environment')).environment.app.debug) {
        console.log('Salvando dados do usuário no Firestore...');
        console.log('Dados do usuário:', usuarioData);
        console.log('Dados da loja:', lojaData);
      }
      
      await Promise.all([
        setDoc(doc(db, 'usuarios', user.uid), usuarioData),
        setDoc(doc(db, 'lojas', user.uid), lojaData)
      ]);
      
      if ((await import('../config/environment')).environment.app.debug) console.log('Dados salvos com sucesso no Firestore');

      return {
        usuario: usuarioData,
        loja: lojaData
      };
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      if ((await import('../config/environment')).environment.app.debug) {
        console.error('Código do erro:', error.code);
        console.error('Mensagem do erro:', error.message);
      }
      
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

  // Login de usuário
  static async login(data: LoginFormData): Promise<Usuario> {
    try {
      if ((await import('../config/environment')).environment.app.debug) {
        console.log('🔑 AuthService.login() - Tentando fazer login...');
        console.log('📧 Email:', data.email);
      }
      
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.senha
      );

      if ((await import('../config/environment')).environment.app.debug) console.log('✅ signInWithEmailAndPassword bem-sucedido!');
      const user = userCredential.user;
      if ((await import('../config/environment')).environment.app.debug) console.log('🆔 UID:', user.uid);
      
      // Buscar dados do usuário no Firestore
      const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
      
      if (!userDoc.exists()) {
        throw new Error('Usuário não encontrado no sistema');
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
      console.error('Erro no login:', error);
      
      // Tratar erros específicos do Firebase Authentication
      if (error.code === 'auth/invalid-credential') {
        throw new Error('E-mail ou senha incorretos. Verifique seus dados e tente novamente.');
      } else if (error.code === 'auth/user-not-found') {
        throw new Error('E-mail não cadastrado. Verifique o e-mail ou crie uma nova conta.');
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Senha incorreta. Verifique sua senha e tente novamente.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Formato de e-mail inválido. Digite um e-mail válido.');
      } else if (error.code === 'auth/user-disabled') {
        throw new Error('Sua conta foi desativada. Entre em contato com o suporte.');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Muitas tentativas de login. Aguarde alguns minutos e tente novamente.');
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error('Erro de conexão. Verifique sua internet e tente novamente.');
      } else {
        throw new Error('Erro ao fazer login: ' + error.message);
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
        if ((await import('../config/environment')).environment.app.debug) console.log('Nenhum usuário Firebase logado');
        return null;
      }

      if ((await import('../config/environment')).environment.app.debug) console.log('Buscando dados do usuário:', user.uid);
      const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
      
      if (!userDoc.exists()) {
        if ((await import('../config/environment')).environment.app.debug) console.log('Documento do usuário não encontrado no Firestore');
        return null;
      }

      const userData = userDoc.data() as Usuario;
      if ((await import('../config/environment')).environment.app.debug) console.log('Dados do usuário encontrados:', userData);
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