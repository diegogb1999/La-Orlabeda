import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {
  datos: any;
  error: string = "";

  usuarioPredefinido = {
    nombre: 'Usuario Prueba',
    email: 'usuario@ejemplo.com'
  };
  //nuevosDatos: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  obtenerRegistro() {
    this.authService.obtenerDatos().subscribe(
      (datos) => {
        this.datos = datos;
        console.log(datos)
      },
      (error) => {
        console.error('Error al recuperar datos:', error);
        this.error = 'Error al recuperar datos. Por favor, intenta nuevamente más tarde.';
      }
    );
  }

  actualizarRegistro(id: string, datosActualizados: any): void {
    this.authService.actualizarDatos(id, datosActualizados).subscribe(
      (respuesta) => {
        console.log('Registro actualizado con éxito:', respuesta);
      },
      (error) => {
        console.error('Error al actualizar registro:', error);
        // Puedes manejar el error de acuerdo a tus necesidades.
      }
    );
  }

  agregarDatosAlServicio(nuevosDatos: any[]): void {
    
    // Llamamos al método agregarDatos del servicio y nos suscribimos al observable resultante
    this.authService.agregarDatos(nuevosDatos).subscribe(
      (respuesta) => {
        console.log('Datos agregados con éxito:', respuesta);
        // Puedes realizar acciones adicionales aquí después de agregar datos
      },
      (error) => {
        console.error('Error al agregar datos:', error);
        // Manejar el error si es necesario
      }
    );
  }



}
