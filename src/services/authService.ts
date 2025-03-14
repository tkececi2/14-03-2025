import { User } from 'firebase/auth';
import { userService } from './userService';
import { storageService } from './storageService';
import type { Kullanici } from '../types';

export class AuthService {
  private static instance: AuthService;
  private currentUser: Kullanici | null = null;

  private constructor() {
    this.currentUser = storageService.getUser();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async getUserProfile(user: User): Promise<Kullanici | null> {
    try {
      const userData = await userService.getUserById(user.uid);
      if (userData) {
        this.setCurrentUser(userData);
      }
      return userData;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  public getCurrentUser(): Kullanici | null {
    if (!this.currentUser) {
      this.currentUser = storageService.getUser();
    }
    return this.currentUser;
  }

  public setCurrentUser(user: Kullanici | null): void {
    this.currentUser = user;
    if (user) {
      storageService.saveUser(user);
    } else {
      storageService.clearUser();
    }
  }

  public clearUserData(): void {
    this.currentUser = null;
    storageService.clearUser();
  }

  public validateStoredUser(uid: string): boolean {
    return storageService.validateStoredUser(uid);
  }

  public isLoggedOut(): boolean {
    return storageService.isLoggedOut();
  }
}

export const authService = AuthService.getInstance();