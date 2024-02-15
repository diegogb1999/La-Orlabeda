import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  
  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        await this.authService.login(email, password); // Asegúrate de esperar la promesa con await
        this.snackBar.open('Inicio de sesión exitoso!', 'Cerrar', {
          duration: 3000,
        });
        this.loginForm.reset();

        // Redirige al usuario a otra ruta/componente
      this.router.navigate(['/inicio']);

      } catch (error: any) { 
        this.snackBar.open('Error al iniciar sesión. Por favor verifica tus credenciales e intenta nuevamente.', 'Cerrar', {
          duration: 3000,
        });
      }
    }
  }
}
