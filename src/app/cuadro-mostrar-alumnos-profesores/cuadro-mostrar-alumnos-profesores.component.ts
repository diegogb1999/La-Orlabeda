import { Component, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/services/auth.service';
import { FirebaseStorageService } from 'src/services/firebase-storage.service';
import { ProfesoresComponent } from '../profesores/profesores.component';
import { DataService } from 'src/services/data.service';
import { AlumnosComponent } from '../alumnos/alumnos.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Alumno } from 'src/clases/Alumno';
import { Profesor } from 'src/clases/Profesor';
import {SelectionModel} from '@angular/cdk/collections';




@Component({
  selector: 'app-cuadro-mostrar-alumnos-profesores',
  templateUrl: './cuadro-mostrar-alumnos-profesores.component.html',
  styleUrls: ['./cuadro-mostrar-alumnos-profesores.component.scss']
})
export class CuadroMostrarAlumnosProfesoresComponent {
  alumnos: any;
  profesores: any;
  //profesores: any;
  dataAlumno!: MatTableDataSource<Alumno>;
  dataProfesor!: MatTableDataSource<Alumno>;
 // dataProfesor!: MatTableDataSource<Profesor>;
  displayedColumnsAlumnos: string[] = ['seleccionar', 'nombre', 'fechaNacimiento', 'grado', ];
  displayedColumnsProfesores: string[] = ['seleccionar', 'nombre', 'fechaNacimiento', 'departamento'];
  seleccionAlumno = new SelectionModel<Alumno>(true, []);
  seleccionProfesor = new SelectionModel<Profesor>(true, []);

  constructor (public dialog: MatDialog, protected dataService: DataService, private storage: AngularFireStorage, protected authService: AuthService, protected seviceStorage: FirebaseStorageService, private snackBar: MatSnackBar, private dialogRef: MatDialogRef<CuadroMostrarAlumnosProfesoresComponent>) {

  }

  ngOnInit(): void {
    //const alumnos = this.dataService.getAlumnos();
    //const profesores = this.dataService.getProfesores();
    this.dataService.getAlumnos().subscribe(alumnos => {
      this.dataAlumno = new MatTableDataSource(alumnos);
      // Si estás usando MatSort o Paginator, asegúrate de asignarlos aquí después de obtener los datos
    });
    this.dataService.getProfesores().subscribe(profesores => {
      this.dataProfesor = new MatTableDataSource(profesores);
      // Si estás usando MatSort o Paginator, asegúrate de asignarlos aquí después de obtener los datos
    });
  }

  agregarAlumnoOrla(): void {
  //this.eliminarProduccion(produccion);
  const alumnosSeleccionados = this.seleccionAlumno.selected;
   // Aquí, puedes llamar a tu servicio para agregar los alumnos seleccionados a la base de datos.
  // Por ejemplo:
  this.dataService.agregarAlumnosOrla(alumnosSeleccionados, 'orlas').subscribe({
    next: (result) => {
      console.log("Alumnos agregados con éxito", result);
      // Aquí puedes limpiar la selección si lo deseas
      this.seleccionAlumno.clear();
      this.dialogRef.close(true);
    },
    error: (error) => console.error("Error al agregar alumnos", error)
  });
}

agregarProfesorOrla(): void {
  //this.eliminarProduccion(produccion);
  const profesoresSeleccionados = this.seleccionProfesor.selected;
   // Aquí, puedes llamar a tu servicio para agregar los alumnos seleccionados a la base de datos.
  // Por ejemplo:
  this.dataService.agregarProfesoresOrla(profesoresSeleccionados, 'orlas').subscribe({
    next: (result) => {
      console.log("Profesores agregados con éxito", result);
      // Aquí puedes limpiar la selección si lo deseas
      this.seleccionProfesor.clear();
      this.dialogRef.close(true);
    },
    error: (error) => console.error("Error al agregar alumnos", error)
  });
}

cancelarAdd(): void {
  this.dialogRef.close(false);
}

}
