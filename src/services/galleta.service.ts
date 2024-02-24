import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'


@Injectable({
  providedIn: 'root'
})

export class GalletaService {

  private readonly COOKIE_KEY = 'my_auth_token';
  
  constructor(private afAuth: AngularFireAuth, private cookieService: CookieService, private authService: AuthService) { }
  
  login(email: string, password: string): Promise<boolean> {
    return this.authService.login(email, password)
      .then((userCredential) => {
        // Aquí asumes que la autenticación fue exitosa y estableces la cookie
        // Puedes ajustar qué información específica deseas almacenar en la cookie
        const token = userCredential.user.uid; // Ejemplo, utilizando el UID como token
        this.cookieService.set(this.COOKIE_KEY, token);
        return true; // Login exitoso
      })
      .catch((error) => {
        console.error('Error en la autenticación:', error);
        return false; // Login fallido
      });
  }

  logout(): void {
    // Eliminar cookie al cerrar sesión
    this.cookieService.delete(this.COOKIE_KEY);
  }
  isLoggedIn(): boolean {
    // Verificar si la cookie existe
    return this.cookieService.check(this.COOKIE_KEY);
  }
  getAuthToken(): string | undefined {
    // Obtener el valor de la cookie
    return this.cookieService.get(this.COOKIE_KEY);
  }
}
