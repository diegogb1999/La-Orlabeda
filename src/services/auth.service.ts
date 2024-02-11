import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Auth, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { AngularFireAuth } from "@angular/fire/compat/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseService: FirebaseService, private afAuth: AngularFireAuth) {}

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
}
