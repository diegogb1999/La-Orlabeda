import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-cuadro-eliminar-profesor',
  templateUrl: './cuadro-eliminar-profesor.component.html',
  styleUrls: ['./cuadro-eliminar-profesor.component.scss']
})
export class CuadroEliminarProfesorComponent {
  nombre!: string;

  constructor(public dialogRef: MatDialogRef<CuadroEliminarProfesorComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.nombre = data.nombre;
  }

  confirmarEliminacion(): void {
    this.dialogRef.close(true);
  }

  cancelarEliminacion(): void {
    this.dialogRef.close(false);
  }
}
