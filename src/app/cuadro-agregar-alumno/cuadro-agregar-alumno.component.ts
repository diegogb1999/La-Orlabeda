import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-cuadro-agregar-alumno',
  templateUrl: './cuadro-agregar-alumno.component.html',
  styleUrls: ['./cuadro-agregar-alumno.component.scss']
})
export class CuadroAgregarAlumnoComponent {

  addAlumnoForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<CuadroAgregarAlumnoComponent>) {
    this.addAlumnoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      edad: ['', [Validators.required,Validators.pattern(/^\d+$/)]],
      grado: ['', [Validators.required]],
      imgPath: ['', [Validators.required]],
    });
  }

  async agregarAlumno() {
    if (this.addAlumnoForm.valid) {
      const { nombre, fechaNacimiento, edad, grado, imgPath } = this.addAlumnoForm.value;
      try {
        //Subir el alumno
        this.snackBar.open('Alumno añadido con éxito!', 'Cerrar', {
          duration: 3000,
        });
        this.addAlumnoForm.reset();
        this.dialogRef.close(true);

      } catch (error: any) {
        // Para cualquier otro error, puedes mostrar un mensaje genérico o manejar otros códigos específicos
        this.snackBar.open('Ocurrió un error al intentar registrar. Por favor intentelo nuevamente mas tarde.', 'Cerrar', {
          duration: 3000,
        });
      }
    }
  }
  cancelarAdd(): void {
    this.dialogRef.close(false);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // Aquí puedes manejar el archivo, como asignarlo a una variable
      // O si necesitas convertirlo a base64 o simplemente guardarlo para su envío
    }
  }


  fileName: any = null;
  inputNode = document.querySelector('#file') as HTMLInputElement;
  onFileSelected() {
    const inputNode = document.querySelector('#file') as HTMLInputElement;
  
    if (inputNode && inputNode.files && inputNode.files.length > 0) {
      this.fileName = inputNode.files[0].name; // Asigna el nombre del archivo a la variable
    }
  }
}
