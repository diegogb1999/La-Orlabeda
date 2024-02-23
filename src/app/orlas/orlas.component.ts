import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { CuadroMostrarAlumnosProfesoresComponent } from '../cuadro-mostrar-alumnos-profesores/cuadro-mostrar-alumnos-profesores.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseStorageService } from 'src/services/firebase-storage.service';
import { DataService } from 'src/services/data.service';
import { map } from 'rxjs';
import { AlumnosComponent } from '../alumnos/alumnos.component';
import { ProfesoresComponent } from '../profesores/profesores.component';

@Component({
  selector: 'app-orlas',
  templateUrl: './orlas.component.html',
  styleUrls: ['./orlas.component.scss']
})
export class OrlasComponent {
  orlas: any;

constructor (public dialog: MatDialog, private dataService: DataService, private storage: AngularFireStorage, protected authService: AuthService, protected seviceStorage: FirebaseStorageService, private snackBar: MatSnackBar) {
}

ngAfterViewInit() {
  //this.alumnos = this.alumnosComp.getAlumnos();
  //this.profesores = this.profesoresComp.getProfesores();
}

openAddOrlaDialog() {
  const dialogRef = this.dialog.open(CuadroMostrarAlumnosProfesoresComponent, {
    width: '1300px',
    height: '650px',
    data: {}
  })

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      //this.alumnosProfesores = this.getAlumnos();
    }
  });
}

}
