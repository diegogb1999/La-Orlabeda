import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/services/data.service';
import { FirebaseStorageService } from 'src/services/firebase-storage.service';


@Component({
  selector: 'app-cuadro-agregar-profesor',
  templateUrl: './cuadro-agregar-profesor.component.html',
  styleUrls: ['./cuadro-agregar-profesor.component.scss']
})
export class CuadroAgregarProfesorComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  addProfesorForm: FormGroup;
  fileSelected: boolean = false;
  nodo: string = "profesores";


  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<CuadroAgregarProfesorComponent>, private storageService: FirebaseStorageService, private dataService: DataService) {
    this.addProfesorForm = this.fb.group({
      nombre: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      departamento: ['', [Validators.required]]
    });
  }

  async agregarProfesor() {

    try {

      if (this.addProfesorForm.valid) {

        const { nombre, fechaNacimiento, edad, departamento } = this.addProfesorForm.value;

        const fecha = new Date(fechaNacimiento);

        let nombreParaComparar = nombre.toLowerCase();

        this.dataService.existeProfesorPorNombre(nombre).subscribe(async existe => {

          if (!existe) {
            const file = this.fileInput.nativeElement.files[0];
            const filePath = `fotosProfesor/${file.name}`;

            const imageUrl = await this.storageService.uploadFile(filePath, file);
            const datosUsuario = { nombre, fechaNacimiento, edad, departamento, imageUrl, nombreParaComparar };

            this.dataService.agregarDatos(datosUsuario, this.nodo).subscribe(() => {
              this.snackBar.open('Profesor añadido con éxito!', 'Cerrar', { duration: 3000 });
              this.addProfesorForm.reset();
              //window.location.reload();
              this.dialogRef.close(true);
            }, error => {
              console.error(error);
              this.snackBar.open('Ocurrió un error al intentar agregar el profesor. Por favor intentelo nuevamente más tarde.', 'Cerrar', { duration: 3000 });
            });


          } else {
            this.snackBar.open('Profesor existente.', 'Cerrar', { duration: 3000 });
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
