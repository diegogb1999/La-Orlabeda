import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Auth, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { map, take } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private readonly COOKIE_KEY = 'my_auth_token';

  constructor(protected cookieService: CookieService,private firebaseService: FirebaseService, private afAuth: AngularFireAuth) {}
  
  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
    }

  login(email: string, password: string): Promise<UserCredential> {
    const auth = this.firebaseService.getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  logout(): Promise<void> {
    const auth = this.firebaseService.getAuth();
    return signOut(auth);
  }

  isAuthenticated(): boolean {
    const auth = this.firebaseService.getAuth();
    return auth.currentUser !== null;
  }

  getToken(): Promise<string | null> {
    const auth = this.firebaseService.getAuth();
    const currentUser = auth.currentUser;
    return currentUser ? currentUser.getIdToken() : Promise.resolve(null);
  }

  //-----------------------------------------------------------------------

 /* loginCookie(email: string, password: string): Promise<boolean> {
    return this.login(email, password)
      .then((token) => {
        this.cookieService.set(this.COOKIE_KEY, token);
        return true; // Login exitoso
      })
      .catch((error) => {
        console.error('Error en la autenticación:', error);
        return false; // Login fallido
      });
  }

  logoutCookie(): void {
    this.cookieService.delete(this.COOKIE_KEY);
  }

  isLoggedInCookie(): boolean {
    return this.cookieService.check(this.COOKIE_KEY);
  }

  getAuthTokenCookie(): string | undefined {
    return this.cookieService.get(this.COOKIE_KEY);
  }*/
  
}
