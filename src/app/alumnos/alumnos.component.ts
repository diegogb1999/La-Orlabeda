import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from 'src/clases/Alumno';
import { CuadroAgregarAlumnoComponent } from '../cuadro-agregar-alumno/cuadro-agregar-alumno.component';
import { Subscription, map } from 'rxjs';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent {
  alumnos: any;

  constructor (public dialog: MatDialog, private dataService: DataService) {
    this.alumnos = this.dataService.obtenerDatos('alumnos').pipe(
      map(response => {
        const alumnos = [];
        for (let key in response) {
          if (response.hasOwnProperty(key)) {
            alumnos.push({ ...response[key], id: key });
          }
        }
        return alumnos;
      })
    );
  }



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
