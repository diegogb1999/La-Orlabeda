import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruebaComponent } from './prueba/prueba.component';
import { perroGuard } from '../guards/perro.guard';
import { InicioComponent } from './inicio/inicio.component';
import { OrlasComponent } from './orlas/orlas.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { HeaderComponent } from './header/header.component';


const routes: Routes = [
  
  { path: 'inicio', component: InicioComponent }, //canActivate: [perroGuard]
  
  { path: 'orlas', component: OrlasComponent },

  { path: 'profesores', component: ProfesoresComponent },

  { path: 'alumnos', component: AlumnosComponent },

  { path: 'login', component: PruebaComponent },

  { path: 'registro', component: PruebaComponent },

  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }
  // Otras rutas...

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
