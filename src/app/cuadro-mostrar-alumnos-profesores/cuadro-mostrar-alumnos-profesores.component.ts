import { Component, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/services/auth.service';
import { FirebaseStorageService } from 'src/services/firebase-storage.service';
import { DataService } from 'src/services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Alumno } from 'src/clases/Alumno';
import { Profesor } from 'src/clases/Profesor';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';




@Component({
  selector: 'app-cuadro-mostrar-alumnos-profesores',
  templateUrl: './cuadro-mostrar-alumnos-profesores.component.html',
  styleUrls: ['./cuadro-mostrar-alumnos-profesores.component.scss']
})
export class CuadroMostrarAlumnosProfesoresComponent {
  dataAlumno!: MatTableDataSource<Alumno>;
  dataProfesor!: MatTableDataSource<Alumno>;

  displayedColumnsAlumnos: string[] = ['seleccionar', 'nombre', 'fechaNacimiento', 'grado',];
  displayedColumnsProfesores: string[] = ['seleccionar', 'nombre', 'fechaNacimiento', 'departamento'];

  seleccionAlumno = new SelectionModel<Alumno>(true, []);
  seleccionProfesor = new SelectionModel<Profesor>(true, []);

  addOrlaForm: FormGroup;

  nodo: string = 'orlas';


  constructor(public dialog: MatDialog, protected dataService: DataService, private storage: AngularFireStorage, protected authService: AuthService, protected seviceStorage: FirebaseStorageService, private snackBar: MatSnackBar, private dialogRef: MatDialogRef<CuadroMostrarAlumnosProfesoresComponent>, private fb: FormBuilder) {
    this.addOrlaForm = this.fb.group({
      nombre: ['', [Validators.required]],
    });
  }

  @ViewChild('profesorPaginator') profesorPaginator!: MatPaginator;
  @ViewChild('alumnoPaginator') alumnoPaginator!: MatPaginator;
  @ViewChild('profesorSort') profesorSort!: MatSort;
  @ViewChild('alumnoSort') alumnoSort!: MatSort;


  ngOnInit(): void {
    this.dataService.getAlumnos().subscribe(alumnos => {
      this.dataAlumno = new MatTableDataSource(alumnos);
      this.dataAlumno.sort = this.alumnoSort;
      this.dataAlumno.paginator = this.alumnoPaginator;
      this.dataAlumno.sortingDataAccessor = (alumno, nombre) => {
        switch (nombre) {
          case 'alumno':
            return alumno.nombre.toLowerCase();
          default:
            return (alumno as any)[nombre];
        }
      };
    });
    this.dataService.getProfesores().subscribe(profesores => {
      this.dataProfesor = new MatTableDataSource(profesores);
      this.dataProfesor.sort = this.profesorSort;
      this.dataProfesor.paginator = this.profesorPaginator;
      this.dataProfesor.sortingDataAccessor = (profesor, nombre) => {
        switch (nombre) {
          case 'profesor':
            return profesor.nombre.toLowerCase();
          default:
            return (profesor as any)[nombre];
        }
      };
    });
  }

  applyFilterProfesor(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataProfesor.filterPredicate = (data: any, filter: string) => {
      const normalizedGenero = data.nombre
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      const normalizedFilter = filter.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      return normalizedGenero.includes(normalizedFilter);
    };
    this.dataProfesor.filter = filterValue.trim().toLowerCase();
  }

  applyFilterAlumno(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataAlumno.filterPredicate = (data: any, filter: string) => {
      const normalizedGenero = data.nombre
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      const normalizedFilter = filter.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      return normalizedGenero.includes(normalizedFilter);
    };
    this.dataAlumno.filter = filterValue.trim().toLowerCase();
  }

  agregarAlumnoOrla(nombre: string): void {
    const alumnosSeleccionados = this.seleccionAlumno.selected.map(p => p.id);
    this.dataService.agregarAlumnosOrla(alumnosSeleccionados, this.nodo, nombre).subscribe({
      next: (result) => {
        console.log("Alumnos agregados con éxito", result);
        this.seleccionAlumno.clear();

      },
      error: (error) => console.error("Error al agregar alumnos", error)
    });
  }

  agregarProfesorOrla(nombre: string): void {
    const profesoresSeleccionados = this.seleccionProfesor.selected.map(id => id.id);
    this.dataService.agregarProfesoresOrla(profesoresSeleccionados, this.nodo, nombre).subscribe({
      next: (result) => {
        console.log("Profesores agregados con éxito", result);
        this.seleccionProfesor.clear();

      },
      error: (error) => console.error("Error al agregar alumnos", error)
    });
  }

  agregarNombreOrla(): void {
    const { nombre } = this.addOrlaForm.value;

    const datosUsuario = { nombre };

    this.dataService.existeOrlaPorNombre(nombre).subscribe(async existe => {

      if (!existe) {

        this.dataService.agregarDatosOrla(datosUsuario, this.nodo, nombre).subscribe(() => {

          this.agregarProfesorOrla(nombre)
          this.agregarAlumnoOrla(nombre)

          this.snackBar.open('Nombre de orla añadida con éxito!', 'Cerrar', { duration: 3000 });
          this.addOrlaForm.reset();
          this.dialogRef.close(true);
          //window.location.reload();

        }, error => {
          console.error(error);
          this.snackBar.open('Ocurrió un error al intentar agregar el nombre de la orla. Por favor intentelo nuevamente más tarde.', 'Cerrar', { duration: 3000 });
        });
      } else {
        this.snackBar.open('Ya existe una orla con ese nombre!.', 'Cerrar', { duration: 3000 });
      }
    }, error => {
      console.error(error);
      this.snackBar.open('Error al comprobar si el alumno existe. Por favor intentelo nuevamente más tarde.', 'Cerrar', { duration: 3000 });
    });
  }

  cancelarAdd(): void {
    this.dialogRef.close(false);
  }

}
