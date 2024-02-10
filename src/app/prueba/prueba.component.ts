import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';
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

  constructor(private dataService: DataService, private authService: AuthService) { }

  ngOnInit(): void {

  }

  //Data

  obtenerRegistro() {
    this.dataService.obtenerDatos().subscribe(
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
    this.dataService.actualizarDatos(id, datosActualizados).subscribe(
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
    this.dataService.agregarDatos(nuevosDatos).subscribe(
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

  //Auth
  email: string = '';
  password: string = '';
  token: string | null = null;

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        console.log('Inicio de sesión exitoso');
        this.updateToken();
      })
      .catch(error => console.error('Error al iniciar sesión', error));
  }
  logout() {
    this.authService.logout()
      .then(() => {
        console.log('Cierre de sesión exitoso');
        this.token = null;
      })
      .catch(error => console.error('Error al cerrar sesión', error));
  }
  private updateToken() {
    this.authService.getToken()
      .then(token => this.token = token)
      .catch(error => console.error('Error al obtener el token',
        error));
  }


}
