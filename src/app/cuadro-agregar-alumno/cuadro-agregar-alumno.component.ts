import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/services/auth.service';
import { DataService } from 'src/services/data.service';
import { FirebaseStorageService } from 'src/services/firebase-storage.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-cuadro-agregar-alumno',
  templateUrl: './cuadro-agregar-alumno.component.html',
  styleUrls: ['./cuadro-agregar-alumno.component.scss']
})
export class CuadroAgregarAlumnoComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  addAlumnoForm: FormGroup;
  fileSelected: boolean = false;
  nodo: string= "alumnos";

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<CuadroAgregarAlumnoComponent>, private storageService: FirebaseStorageService, private dataService: DataService) {
    this.addAlumnoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      grado: ['', [Validators.required]]
    });
  }


  async agregarAlumno() {
    if (this.addAlumnoForm.valid) {
      const { nombre } = this.addAlumnoForm.value;
      
      // Verifica si ya existe un alumno con el mismo nombre
      this.dataService.existeAlumnoPorNombre(nombre).subscribe(async existe => {
        if (existe) {
          // Si el alumno ya existe, muestra un snackbar con el mensaje de error
          this.snackBar.open('Ya existe un alumno con este nombre. Por favor, elige un nombre diferente.', 'Cerrar', { duration: 3000 });
        } else {
          // Si el alumno no existe, procede con la lógica de agregar alumno
          const file = this.fileInput.nativeElement.files[0];
          const filePath = `fotosAlumno/${file.name}`; // Genera un nombre de archivo único
  
          try {
            // Sube la imagen a Firebase Storage y obtiene la URL
            const imageUrl = await this.storageService.uploadFile(filePath, file);
            const { fechaNacimiento, edad, grado } = this.addAlumnoForm.value;
            const datosUsuario = { nombre, fechaNacimiento, edad, grado, imageUrl };
  
            // Guarda los datos del usuario en Firebase Realtime Database
            this.dataService.agregarDatos(datosUsuario, this.nodo).subscribe(() => {
              this.snackBar.open('Alumno añadido con éxito!', 'Cerrar', { duration: 3000 });
              this.addAlumnoForm.reset();
              this.dialogRef.close(true);
            }, error => {
              console.error(error);
              this.snackBar.open('Ocurrió un error al intentar registrar. Por favor intentelo nuevamente más tarde.', 'Cerrar', { duration: 3000 });
            });
          } catch (error) {
            console.error(error);
            this.snackBar.open('Error al subir la imagen. Por favor intentelo nuevamente más tarde.', 'Cerrar', { duration: 3000 });
          }
        }
      }, error => {
        console.error(error);
        this.snackBar.open('Ocurrió un error al verificar la existencia del alumno. Por favor intentelo nuevamente más tarde.', 'Cerrar', { duration: 3000 });
      });
    }
  }

  cancelarAdd(): void {
    this.dialogRef.close(false);
  }

  srcResult: any;
  onFileSelected() {
    const inputNode = document.querySelector('#file') as HTMLInputElement;

    if (typeof FileReader !== 'undefined' && inputNode && inputNode.files && inputNode.files.length > 0) {
      this.fileSelected = true; // Actualiza aquí
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        // Asegúrate de que e.target no sea null utilizando el operador ?.
        this.srcResult = e.target?.result;
      };

      reader.readAsDataURL(inputNode.files[0]);
    } else {
      this.fileSelected = false; // Asegúrate de manejar el caso donde no hay archivo
    }
  }
}
