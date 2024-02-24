import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/services/data.service';
import { FirebaseStorageService } from 'src/services/firebase-storage.service';


@Component({
  selector: 'app-cuadro-actualizar-alumno',
  templateUrl: './cuadro-actualizar-alumno.component.html',
  styleUrls: ['./cuadro-actualizar-alumno.component.scss']
})
export class CuadroActualizarAlumnoComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  editarAlumnoForm!: FormGroup;
  fileSelected: boolean = false;
  nodo: string = "alumnos";


  constructor(private snackBar: MatSnackBar, private storageService: FirebaseStorageService, private dataService: DataService, private dialogRef: MatDialogRef<CuadroActualizarAlumnoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.initForm();
    this.srcResult = this.data.alumno.imageUrl;
  }

  initForm(): void {
    this.editarAlumnoForm = new FormGroup({
      nombre: new FormControl(this.data.alumno.nombre, Validators.required),
      fechaNacimiento: new FormControl(this.data.alumno.fechaNacimiento, Validators.required),
      edad: new FormControl(this.data.alumno.edad, [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ]),
      grado: new FormControl(this.data.alumno.grado, Validators.required)
    });
  }

  async editarAlumno() {

    try {

      if (this.editarAlumnoForm.valid) {

        const { nombre, fechaNacimiento, edad, grado } = this.editarAlumnoForm.value;

        let imageUrl = this.srcResult;
        let nombreParaComparar = nombre.toLowerCase();

        const fecha = new Date(fechaNacimiento);

        this.dataService.existeAlumnoPorNombre(nombre).subscribe(async existe => {

          if (!existe || (existe && this.data.alumno.nombreParaComparar == nombre.toLowerCase())) {
 
            const file = this.fileInput.nativeElement.files[0];

            if (file) {
              const filePath = `fotosAlumno/${file.name}`;
              imageUrl = await this.storageService.uploadFile(filePath, file);
            }

            const datosUsuario = { nombre, fechaNacimiento, edad, grado, imageUrl, nombreParaComparar };

            this.dataService.actualizarDatos(this.data.alumno.id, datosUsuario, this.nodo).subscribe(() => {
              this.snackBar.open('Alumno actualizado con éxito!', 'Cerrar', { duration: 3000 });
              this.editarAlumnoForm.reset();
              //window.location.reload();
              this.dialogRef.close(true);
            }, error => {
              console.error(error);
              this.snackBar.open('Ocurrió un error al intentar agregar el alumno. Por favor intentelo nuevamente más tarde.', 'Cerrar', { duration: 3000 });
            });

          } else {
            this.snackBar.open('Ese nombre de usuario ya pertenece a otro alumno.', 'Cerrar', { duration: 3000 });
          }

        }, error => {
          console.error(error);
          this.snackBar.open('Error al comprobar si el alumno existe. Por favor intentelo nuevamente más tarde.', 'Cerrar', { duration: 3000 });
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
      this.fileSelected = true;
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.srcResult = e.target?.result;
      };

      reader.readAsDataURL(inputNode.files[0]);
    } else {
      this.fileSelected = false; 
    }
  }

}
