import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        const token = await this.authService.register(email, password);
        this.registerForm.reset();

        this.router.navigate(['/inicio']);

      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          this.snackBar.open('El correo electrónico ya está en uso.', 'Cerrar', {
            duration: 3000,
          });
        } else {
          this.snackBar.open('Ocurrió un error al intentar registrar. Por favor intentelo nuevamente mas tarde.', 'Cerrar', {
            duration: 3000,
          });
        }
      }
    }
  }


}
