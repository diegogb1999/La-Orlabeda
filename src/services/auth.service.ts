import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { signOut } from 'firebase/auth';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly COOKIE_KEY = 'my_auth_token';

  constructor(private snackBar: MatSnackBar, protected cookieService: CookieService, private firebaseService: FirebaseService, private afAuth: AngularFireAuth) { }

  register(email: string, password: string): Promise<boolean> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user) {
          return result.user.getIdToken().then((token) => {
            this.cookieService.set(this.COOKIE_KEY, token);
            this.snackBar.open('Registro completado con éxito!', 'Cerrar', {
              duration: 3000,
            });
            return true;
          });
        } else {
          this.snackBar.open('Error al registrarse. Por favor verifica tus credenciales e intenta nuevamente.', 'Cerrar', {
            duration: 3000,
          });
          throw new Error('No user found');
        }
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          this.snackBar.open('El correo electrónico ya está en uso. Por favor, intenta con uno diferente.', 'Cerrar', {
            duration: 3000,
          });
        } else {
          this.snackBar.open('Error no especificado, intentelo de nuevo mas tarde.', 'Cerrar', {
            duration: 3000,
          });
        }
        return false;
      });
  }

  /*login(email: string, password: string): Promise<UserCredential> {
    const auth = this.firebaseService.getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }*/

  login(email: string, password: string): Promise<boolean> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user) {
          return result.user.getIdToken().then((token) => {
            this.cookieService.set(this.COOKIE_KEY, token);
            this.snackBar.open('Inicio de sesión correcto!', 'Cerrar', {
              duration: 3000,
            });
            return true;
          });
        } else {
          this.snackBar.open('Error al iniciar sesión. Por favor verifica tus credenciales e intenta nuevamente.', 'Cerrar', {
            duration: 3000,
          });
          throw new Error('No user found');

        }
      })
      .catch((error) => {
        console.log(error);
        this.snackBar.open('Error inesperado. Intentalo de nuevo mas tarde.', 'Cerrar', {
          duration: 3000,
        });
        return false;
      });
  }

  logout(): Promise<void> {
    this.cookieService.delete(this.COOKIE_KEY);
    const auth = this.firebaseService.getAuth();
    return signOut(auth);
  }

  isAuthenticated(): boolean {
    const auth = this.firebaseService.getAuth();
    return auth.currentUser !== null;
  }

  isLoggedInCookie(): boolean {
    return this.cookieService.check(this.COOKIE_KEY);
  }

  getToken(): Promise<string | null> {
    const auth = this.firebaseService.getAuth();
    const currentUser = auth.currentUser;
    return currentUser ? currentUser.getIdToken() : Promise.resolve(null);
  }

  getAuthTokenCookie(): string | undefined {
    return this.cookieService.get(this.COOKIE_KEY);
  }

  loadAcc(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        user.getIdToken().then(token => {
          this.cookieService.set(this.COOKIE_KEY, token);
          console.log('Bienvenido usuario logeado')
        }).catch(error => {
          console.error('Error obteniendo el token del usuario:', error);
        });
      } else {
        console.log('Bienvenido usuario sin logear')
      }
    });
  }

}
