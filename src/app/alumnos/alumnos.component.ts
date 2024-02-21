import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from 'src/clases/Alumno';
import { CuadroAgregarAlumnoComponent } from '../cuadro-agregar-alumno/cuadro-agregar-alumno.component';
import { Subscription, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { DataService } from 'src/services/data.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'src/services/auth.service';
import { FirebaseStorageService } from 'src/services/firebase-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CuadroActualizarAlumnoComponent } from '../cuadro-actualizar-alumno/cuadro-actualizar-alumno.component';
import { CuadroEliminarAlumnoComponent } from '../cuadro-eliminar-alumno/cuadro-eliminar-alumno.component';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent {
  alumnos: any;

  constructor(public dialog: MatDialog, private dataService: DataService, private storage: AngularFireStorage, protected authService: AuthService, protected seviceStorage: FirebaseStorageService, private snackBar: MatSnackBar) {
  }
  ngAfterViewInit() {
    this.alumnos = this.getAlumnos();
  }

  // Agrega esto dentro de tu clase AlumnosComponent
  getAlumnos() {
    return this.dataService.obtenerDatos('alumnos').pipe(
      map(response => Object.keys(response).map(key => ({ ...response[key], id: key })))
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
        this.alumnos = this.getAlumnos();
      }
    });
  }

  openEditAlumnoDialog(alumno: Alumno) {
    const dialogRef = this.dialog.open(CuadroActualizarAlumnoComponent, {
      width: '1000px',
      height: '600px',
      data: { alumno: alumno } // Pasamos el alumno seleccionado al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes manejar el resultado del diálogo, por ejemplo, actualizar la lista de alumnos
        this.alumnos = this.getAlumnos();
      }
    });
  }

  eliminarAlumno(alumno: any) {
    
    this.seviceStorage.deleteFile(alumno.imageUrl).then(() => {
      this.dataService.eliminarRegistro(alumno.id, 'alumnos').subscribe(() => {
        this.alumnos = this.getAlumnos(); // Actualizar lista de alumnos
        // Considera evitar el uso de window.location.reload() para no recargar toda la página.
      }, error => {
        console.error("Error al eliminar el registro del alumno ya que no existe:", error);
        this.snackBar.open('Error al eliminar el alumno.', 'Cerrar', { duration: 3000 });
      });
    }).catch(error => {
      console.error("Error al eliminar la imagen ya que no existe:", error);
      this.dataService.eliminarRegistro(alumno.id, 'alumnos');
        this.alumnos = this.getAlumnos(); // Actualizar lista de alumnos

    });
  }

  openDeleteDialog(alumno: any) {
    const dialogRef = this.dialog.open(CuadroEliminarAlumnoComponent, {
      width: '700px',
      height: '200px',
      data: {
        nombre: alumno.nombre
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarAlumno(alumno);
        this.snackBar.open('El alumno ha sido borrado con exito!', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
        });
      }
    });
  }

}
