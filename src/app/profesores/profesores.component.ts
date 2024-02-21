import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { DataService } from 'src/services/data.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'src/services/auth.service';
import { FirebaseStorageService } from 'src/services/firebase-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CuadroAgregarProfesorComponent } from '../cuadro-agregar-profesor/cuadro-agregar-profesor.component';
import { CuadroActualizarProfesorComponent } from '../cuadro-actualizar-profesor/cuadro-actualizar-profesor.component';
import { Profesor } from 'src/clases/Profesor';
import { CuadroEliminarProfesorComponent } from '../cuadro-eliminar-profesor/cuadro-eliminar-profesor.component';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})
export class ProfesoresComponent {
  profesores: any;

  constructor (public dialog: MatDialog, private dataService: DataService, private storage: AngularFireStorage, protected authService: AuthService, protected seviceStorage: FirebaseStorageService, private snackBar: MatSnackBar) {
  }
  ngAfterViewInit() {
    this.profesores = this.getProfesores();
  }

// Agrega esto dentro de tu clase AlumnosComponent
getProfesores() {
  return this.dataService.obtenerDatos('profesores').pipe(
    map(response => {
      // Comprobar si response es null o undefined
      if (response === null || response === undefined) {
        // Devolver un arreglo vacío si no hay datos
        return [];
      }
      // Si hay datos, proceder con el mapeo
      return Object.keys(response).map(key => ({ ...response[key], id: key }));
    })
  );
}

  openAddProfesorDialog() {
    const dialogRef = this.dialog.open(CuadroAgregarProfesorComponent, {
      width: '1000px',
      height: '600px',
      data: {}
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.profesores = this.getProfesores();
      }
    });
  }

  openEditProfesorDialog(profesor: Profesor) {
    const dialogRef = this.dialog.open(CuadroActualizarProfesorComponent, {
      width: '1000px',
      height: '600px',
      data: { profesor: profesor } // Pasamos el alumno seleccionado al diálogo
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí puedes manejar el resultado del diálogo, por ejemplo, actualizar la lista de alumnos
        this.profesores = this.getProfesores();
      }
    });
  }

  eliminarProfesor(profesor: any) {
    
    this.seviceStorage.deleteFile(profesor.imageUrl).then(() => {
      this.dataService.eliminarRegistro(profesor.id, 'profesores').subscribe(() => {
        this.profesores = this.getProfesores();
      }, error => {
        //console.error("Error al eliminar el registro del profesor ya que no existe:", error);
        this.snackBar.open('Error al eliminar el profesor.', 'Cerrar', { duration: 3000 });
      });
    }).catch(error => {
      //console.error("La imagen no existe:", error);
      this.dataService.eliminarRegistro(profesor.id, 'profesores').subscribe(() => {
        this.profesores = this.getProfesores();
      }, error => {
        this.snackBar.open('Error al eliminar el profesor.', 'Cerrar', { duration: 3000 });
      });
        this.profesores = this.getProfesores(); // Actualizar lista de alumnos
    });
  }


  openDeleteDialog(profesor: any) {
    const dialogRef = this.dialog.open(CuadroEliminarProfesorComponent, {
      width: '700px',
      height: '200px',
      data: {
        nombre: profesor.nombre
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarProfesor(profesor);
      }
    });
  }
}
