import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/services/auth.service';
import { fadeAnimation } from '../../transitions/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fadeAnimation]
})
export class HeaderComponent {

  constructor(private afAuth: AngularFireAuth, private snackBar: MatSnackBar, protected authService: AuthService, private router: Router) {

  }

  async logout() {
    const user = await this.afAuth.currentUser;
    if (user) {
      await this.authService.logout();
      this.snackBar.open('Sesión cerrada con éxito!', 'Cerrar', { duration: 3000 });
      this.router.navigate(['/inicio']);
    } else {
      this.snackBar.open('No hay ninguna sesión iniciada.', 'Cerrar', { duration: 3000 });
    }
  }
}
