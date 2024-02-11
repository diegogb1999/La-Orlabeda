import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const perroGuard: CanActivateFn = (route, state) => {
  
  // Obtener una instancia del servicio LoginService utilizando la función inject
  const loginService = inject(AuthService);
  // Obtener una instancia del servicio Router utilizando la función
  inject
  const router = inject(Router);
  // Verificar si el usuario está autenticado utilizando el método isLogIn() del servicio LoginService
  if (loginService.isAuthenticated()) {
    // Si el usuario está autenticado, permite la activación de la ruta
    return true;
  } else {
    // Si el usuario no está autenticado, redirige a la ruta '/login' 
    router.navigate(['/login']);
    // No permite la activación de la ruta
    return false;
  }

}
