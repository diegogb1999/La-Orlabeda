import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruebaComponent } from './prueba/prueba.component';
import { perroGuard } from '../guards/perro.guard';


const routes: Routes = [
  // Ruta protegida con el guardián
  { path: 'home', component: PruebaComponent, canActivate: [perroGuard] },
  // Ruta pública
  { path: 'login', component: PruebaComponent },
  // Otras rutas...

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
