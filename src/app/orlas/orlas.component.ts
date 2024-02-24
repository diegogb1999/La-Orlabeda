import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { CuadroMostrarAlumnosProfesoresComponent } from '../cuadro-mostrar-alumnos-profesores/cuadro-mostrar-alumnos-profesores.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseStorageService } from 'src/services/firebase-storage.service';
import { DataService } from 'src/services/data.service';
import { AlumnosComponent } from '../alumnos/alumnos.component';
import { ProfesoresComponent } from '../profesores/profesores.component';
import { CuadroEliminarAlumnoComponent } from '../cuadro-eliminar-alumno/cuadro-eliminar-alumno.component';
import { Profesor } from 'src/clases/Profesor';
import { Alumno } from 'src/clases/Alumno';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-orlas',
  templateUrl: './orlas.component.html',
  styleUrls: ['./orlas.component.scss']
})
export class OrlasComponent {
  orlas: any;

constructor (public dialog: MatDialog, private dataService: DataService, private storage: AngularFireStorage, protected authService: AuthService, protected seviceStorage: FirebaseStorageService, private snackBar: MatSnackBar) {
  this.orlas = this.getOrlasConDetalles();
}


ngAfterViewInit() {
  //this.alumnos = this.alumnosComp.getAlumnos();
  //this.profesores = this.profesoresComp.getProfesores();
  this.orlas = this.getOrlasConDetalles();
}

openAddOrlaDialog() {
  const dialogRef = this.dialog.open(CuadroMostrarAlumnosProfesoresComponent, {
    width: '1300px',
    height: '650px',
    data: {}
  })

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.orlas = this.getOrlasConDetalles();
    }
  });
}

openDeleteDialog(orla: any) {
  const dialogRef = this.dialog.open(CuadroEliminarAlumnoComponent, {
    width: '700px',
    height: '200px',
    data: {
      nombre: orla.nombre
    }
  })

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.eliminarOrla(orla);
      this.snackBar.open('El alumno ha sido borrado con exito!', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
      });
    }
  });
}

eliminarOrla(orla: any) {
    this.dataService.eliminarRegistro(orla.id, 'orlas').subscribe(() => {
      this.orlas = this.getOrlasConDetalles();
    }, error => {
      //console.error("Error al eliminar el registro del profesor ya que no existe:", error);
      this.snackBar.open('Error al eliminar la orla.', 'Cerrar', { duration: 3000 });
    });
}

getOrlasConDetalles() {
  // Obtener las orlas primero
  return this.dataService.getOrlas().pipe(
    switchMap(orlas => {
      // Mapear las orlas a observables que incluyen detalles de profesores y alumnos
      const orlasDetallesObservables = orlas.map(orla => {
        // Observable para los detalles de profesores
        const profesoresDetallesObservables = orla.profesores.map((profesorId: any) =>
          this.dataService.obtenerProfesorPorId(profesorId).pipe(
            catchError(error => of({ id: profesorId, nombre: 'Profesor Desconocido' }))
          )
        );

        // Observable para los detalles de alumnos
        const alumnosDetallesObservables = orla.alumnos.map((alumnoId: any) =>
          this.dataService.obtenerAlumnoPorId(alumnoId).pipe(
            catchError(error => of({ id: alumnoId, nombre: 'Alumno Desconocido' }))
          )
        );

        // Combinar los observables de profesores y alumnos
        return combineLatest([
          forkJoin(profesoresDetallesObservables),
          forkJoin(alumnosDetallesObservables)
        ]).pipe(
          map(([profesores, alumnos]) => {
            // Combinar los resultados en la orla
            return { ...orla, profesores, alumnos };
          })
        );
      });

      // Esperar a que todos los detalles de orlas se resuelvan
      return forkJoin(orlasDetallesObservables);
    }),
    tap(orlasConDetalles => console.log('Orlas con detalles completos:', orlasConDetalles))
    // ... manejo de errores ...
  );
}

}
