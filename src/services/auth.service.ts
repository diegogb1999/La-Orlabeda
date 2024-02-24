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

  private readonly COOKIE_KEY = 'my_auth_token';

  constructor(protected cookieService: CookieService,private firebaseService: FirebaseService, private afAuth: AngularFireAuth) {}
  
  register(email: string, password: string): Promise<string> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Verificar si userCredential.user no es null antes de llamar a getIdToken()
        if (userCredential.user !== null) {
          return userCredential.user.getIdToken(); // Retornamos el token si el usuario no es null
        } else {
          throw new Error('No user data available after registration.'); // Lanzamos un error si user es null
        }
      });
  }

  login(email: string, password: string): Promise<string> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        if (userCredential.user !== null) {
          return userCredential.user.getIdToken(); // Procede a obtener el token si el usuario no es null
        } else {
          throw new Error('No user data available after login.'); // Lanza un error si user es null
        }
      });
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  isAuthenticated(): boolean {
    return this.afAuth.authState !== null;
  }

  getToken(): Promise<string | null> {
    return this.afAuth.authState.pipe(
        take(1),
        map(user => user ? user.getIdToken() : null)
      ).toPromise()
      .then(tokenPromise => tokenPromise ? tokenPromise : null);
  }

  //-----------------------------------------------------------------------

  loginCookie(email: string, password: string): Promise<boolean> {
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
  }
  
}
