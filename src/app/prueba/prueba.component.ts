import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseStorageService } from '../../services/firebase-storage.service';


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

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService, private authService: AuthService, private firebaseStorageService: FirebaseStorageService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onSubmit() {
    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')!.value;
      const password = this.registerForm.get('password')!.value;
      this.authService.register(email, password)
        .then(response => {
          console.log('Usuario registrado con éxito:', response);
          // Puedes redirigir a una página de bienvenida u otra acción
        })
        .catch(error => {
          console.error('Error al registrar usuario:', error);
        });
    }
  }


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

  //FirebaseStorage
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFileAndAddData() {
    if (this.selectedFile) {
      //const filePath = `images/${Date.now()}_${file.name}`;
      const filePath = 'tu/directorio/subida/' + this.selectedFile.name;
      // Sube el archivo a Firebase Storage
      this.firebaseStorageService.uploadFile(filePath,
        this.selectedFile).then((downloadURL) => {
          // Ahora, downloadURL contiene la URL de la imagen subida
          // Puedes usar downloadURL para agregar datos a la base de datos en tiempo real
          const dataToAdd = {
            imageUrl: downloadURL,
            // Otros datos que deseas agregar
          };
          // Agrega datos a la base de datos en tiempo real
          this.dataService.agregarDatos(dataToAdd).subscribe(
            (response) => {
              console.log('Datos agregados con éxito', response);
            },
            (error) => {
              console.error('Error al agregar datos', error);
            }
          );
        });
    }
  }

}
