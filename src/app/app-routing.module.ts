import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { perroGuard } from '../guards/perro.guard';
import { InicioComponent } from './inicio/inicio.component';
import { OrlasComponent } from './orlas/orlas.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';


const routes: Routes = [
  
  { path: 'inicio', component: InicioComponent },
  
  { path: 'orlas', component: OrlasComponent }, //, canActivate: [perroGuard]

  { path: 'profesores', component: ProfesoresComponent },

  { path: 'alumnos', component: AlumnosComponent },

  { path: 'login', component: LoginComponent },

  { path: 'registro', component: RegistroComponent },

  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }
  // Otras rutas...

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
