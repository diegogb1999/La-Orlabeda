import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { InicioComponent } from './inicio/inicio.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { OrlasComponent } from './orlas/orlas.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { CuadroAgregarAlumnoComponent } from './cuadro-agregar-alumno/cuadro-agregar-alumno.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';;
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { CuadroActualizarAlumnoComponent } from './cuadro-actualizar-alumno/cuadro-actualizar-alumno.component';
import { CuadroEliminarAlumnoComponent } from './cuadro-eliminar-alumno/cuadro-eliminar-alumno.component';
import { CuadroAgregarProfesorComponent } from './cuadro-agregar-profesor/cuadro-agregar-profesor.component';
import { CuadroEliminarProfesorComponent } from './cuadro-eliminar-profesor/cuadro-eliminar-profesor.component';
import { CuadroActualizarProfesorComponent } from './cuadro-actualizar-profesor/cuadro-actualizar-profesor.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderComponent,
    OrlasComponent,
    AlumnosComponent,
    ProfesoresComponent,
    RegistroComponent,
    LoginComponent,
    CuadroAgregarAlumnoComponent,
    CuadroActualizarAlumnoComponent,
    CuadroEliminarAlumnoComponent,
    CuadroAgregarProfesorComponent,
    CuadroEliminarProfesorComponent,
    CuadroActualizarProfesorComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDividerModule,
    MatMenuModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    DatePipe,
    MatSelectModule,
    MatRadioModule,
    AngularFireStorageModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
