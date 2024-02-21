import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/services/auth.service';
import { DataService } from 'src/services/data.service';
import { FirebaseStorageService } from 'src/services/firebase-storage.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cuadro-actualizar-profesor',
  templateUrl: './cuadro-actualizar-profesor.component.html',
  styleUrls: ['./cuadro-actualizar-profesor.component.scss']
})
export class CuadroActualizarProfesorComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  editarProfesorForm!: FormGroup;
  fileSelected: boolean = false;
  nodo: string = "profesores";


  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private storageService: FirebaseStorageService, private dataService: DataService, private dialogRef: MatDialogRef<CuadroActualizarProfesorComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    
      this.initForm();
      this.srcResult = this.data.profesor.imageUrl;
  }

  initForm(): void {
    this.editarProfesorForm = new FormGroup({
      nombre: new FormControl(this.data.profesor.nombre, Validators.required),
      fechaNacimiento: new FormControl(this.data.profesor.fechaNacimiento, Validators.required),
      edad: new FormControl(this.data.profesor.edad, [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ]),
      departamento: new FormControl(this.data.profesor.departamento, Validators.required)
      // Añade aquí otros campos según necesites
    });
  }

  async editarProfesor() {

    try {

      if (this.editarProfesorForm.valid) {

        const { nombre, fechaNacimiento, edad, departamento } = this.editarProfesorForm.value;

        let imageUrl = this.srcResult;
        let nombreParaComparar = nombre.toLowerCase();

        const fecha = new Date(fechaNacimiento);

        this.dataService.existeProfesorPorNombre(nombre).subscribe(async existe => {

          if (!existe || (existe && this.data.profesor.nombreParaComparar == nombre.toLowerCase())) {
            // Si el alumno no existe, procede con la lógica de agregar alumno
            const file = this.fileInput.nativeElement.files[0];

            if (file) { 
            const filePath = `fotosProfesor/${file.name}`;
            imageUrl = await this.storageService.uploadFile(filePath, file);
            }

            const datosUsuario = { nombre, fechaNacimiento, edad, departamento, imageUrl, nombreParaComparar };

            // Guarda los datos del usuario en Firebase Realtime Database
            this.dataService.actualizarDatos(this.data.profesor.id, datosUsuario, this.nodo).subscribe(() => {
              this.snackBar.open('Profesor actualizado con éxito!', 'Cerrar', { duration: 3000 });
              this.editarProfesorForm.reset();
              //window.location.reload();
              this.dialogRef.close(true);
            }, error => {
              console.error(error);
              this.snackBar.open('Ocurrió un error al intentar agregar el profesor. Por favor intentelo nuevamente más tarde.', 'Cerrar', { duration: 3000 });
            });

          } else {
            this.snackBar.open('Ese nombre ya pertenece a otro profesor.', 'Cerrar', { duration: 3000 });
          }

        }, error => {
          console.error(error);
          this.snackBar.open('Error al comprobar si el profesor existe. Por favor intentelo nuevamente más tarde.', 'Cerrar', { duration: 3000 });
        });

      }
    } catch (error) {
      this.snackBar.open('Error atrapado. Por favor intentelo nuevamente más tarde.', 'Cerrar', { duration: 3000 });
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
