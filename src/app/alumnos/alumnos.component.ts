import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from 'src/clases/Alumno';
import { CuadroAgregarAlumnoComponent } from '../cuadro-agregar-alumno/cuadro-agregar-alumno.component';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent {
  listaAlumnos: Alumno[] = [];

  constructor (public dialog: MatDialog) {}

  openAddAlumnoDialog() {
    const dialogRef = this.dialog.open(CuadroAgregarAlumnoComponent, {
      width: '1000px',
      height: '600px',
      data: {}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
    
      }
    });
  }
}
