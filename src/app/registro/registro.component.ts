import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(7)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  
  async register() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      try {
        await this.authService.register(email, password); // Asegúrate de esperar la promesa con await
        this.snackBar.open('Registro completado con éxito!', 'Cerrar', {
          duration: 3000,
        });
        this.registerForm.reset();

        // Redirige al usuario a otra ruta/componente
      this.router.navigate(['/inicio']);

      } catch (error: any) { // Asegúrate de capturar el error correctamente
        // Verifica si el error corresponde a un email ya en uso
        if (error.code === 'auth/email-already-in-use') {
          this.snackBar.open('El correo electrónico ya está en uso.', 'Cerrar', {
            duration: 3000,
          });
        } else {
          // Para cualquier otro error, puedes mostrar un mensaje genérico o manejar otros códigos específicos
          this.snackBar.open('Ocurrió un error al intentar registrar. Por favor intentelo nuevamente mas tarde.', 'Cerrar', {
            duration: 3000,
          });
        }
      }
    }
  }

  
}
