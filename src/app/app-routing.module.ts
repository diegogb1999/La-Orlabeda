import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruebaComponent } from './prueba/prueba.component';
import { perroGuard } from '../guards/perro.guard';
import { InicioComponent } from './inicio/inicio.component';


const routes: Routes = [

  { path: '', component: InicioComponent },
  // Ruta protegida con el guardián
  { path: 'inicio', component: InicioComponent }, //canActivate: [perroGuard]
  // Ruta pública
  { path: 'login', component: PruebaComponent },

  { path: 'register', component: PruebaComponent }
  // Otras rutas...

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
