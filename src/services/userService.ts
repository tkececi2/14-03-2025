import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Kullanici } from '../types';

export class UserService {
  private static instance: UserService;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async getUserById(userId: string): Promise<Kullanici | null> {
    try {
      const userDoc = await getDoc(doc(db, 'kullanicilar', userId));
      if (!userDoc.exists()) return null;
      return { id: userDoc.id, ...userDoc.data() } as Kullanici;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }
}

export const userService = UserService.getInstance();