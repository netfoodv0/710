import { BaseFirestoreService } from './BaseFirestoreService';

// Mock do Firebase
jest.mock('../../lib/firebase', () => ({
  auth: {
    currentUser: {
      uid: 'test-loja-id'
    }
  },
  db: {}
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
  doc: jest.fn()
}));

describe('BaseFirestoreService', () => {
  let service: BaseFirestoreService;

  beforeEach(() => {
    service = new BaseFirestoreService();
  });

  describe('getLojaId', () => {
    it('should return the current user ID', () => {
      expect(service.getLojaId()).toBe('test-loja-id');
    });
  });

  describe('createConstraints', () => {
    it('should return constraint functions', () => {
      const constraints = service.createConstraints();
      
      expect(typeof constraints.orderByDesc).toBe('function');
      expect(typeof constraints.orderByAsc).toBe('function');
      expect(typeof constraints.limit).toBe('function');
      expect(typeof constraints.where).toBe('function');
    });
  });
});