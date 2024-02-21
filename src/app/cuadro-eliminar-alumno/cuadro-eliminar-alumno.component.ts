import { MatDialogRef, MAT_DIALOG_DATA } from'@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-cuadro-eliminar-alumno',
  templateUrl: './cuadro-eliminar-alumno.component.html',
  styleUrls: ['./cuadro-eliminar-alumno.component.scss']
})
export class CuadroEliminarAlumnoComponent {
nombre!: string;

  constructor(public dialogRef: MatDialogRef<CuadroEliminarAlumnoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.nombre = data.nombre;
  }

  confirmarEliminacion(): void {
    this.dialogRef.close(true); 
  }

  cancelarEliminacion(): void {
    this.dialogRef.close(false);
  }
}
