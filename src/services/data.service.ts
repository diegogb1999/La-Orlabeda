import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, map, switchMap, take, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { CookieService } from 'ngx-cookie-service';
import 'firebase/database';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private firebaseUrl = 'DBURL_GOES_HERE/';

  constructor(private http: HttpClient, private authService: AuthService, private db: AngularFireDatabase, private cookieService: CookieService, firebaseService: FirebaseService) {

  }

  agregarDatos(datos: any, nodo: string): Observable<any> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        const url = `${this.firebaseUrl}/${nodo}.json?auth=${token}`;
        return this.http.post(url, datos);
      })
    );
  }

  obtenerDatos(nodo: string): Observable<any> {
    return this.http.get(`${this.firebaseUrl}/${nodo}.json?auth=${this.authService.getAuthTokenCookie()}`);
  }

  /*
  obtenerAlumnos(): Observable<any[]> {
  return this.db.list('/alumnos').snapshotChanges().pipe(
    map(changes => 
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    )
  );
}
  */

  actualizarDatos(id: string, datosActualizados: any, nodo: string): Observable<any> {
    const url = `${this.firebaseUrl}${nodo}/${id}.json?auth=${this.authService.getAuthTokenCookie()}`;
    return this.http.put<any>(url, datosActualizados);
  }

  eliminarRegistro(id: string, nodo: string): Observable<void> {
    const url = `${this.firebaseUrl}${nodo}/${id}.json?auth=${this.authService.getAuthTokenCookie()}`;
    return this.http.delete<void>(url);
  }

  existeAlumnoPorNombre(nombre: string): Observable<boolean> {
    nombre = nombre.toLowerCase(); // Convertir el nombre a minúsculas para la comparación
    return this.db.list('/alumnos', ref => ref.orderByChild('nombreParaComparar').equalTo(nombre))
      .snapshotChanges() // Usa snapshotChanges para acceder a los datos y metadatos
      .pipe(
        take(1), // Asegura que solo se accede una vez a los datos
        map(changes => changes.length > 0) // Transforma el resultado a un valor booleano
      );
  }

  existeProfesorPorNombre(nombre: string): Observable<boolean> {
    nombre = nombre.toLowerCase(); // Convertir el nombre a minúsculas para la comparación
    return this.db.list('/profesores', ref => ref.orderByChild('nombreParaComparar').equalTo(nombre))
      .snapshotChanges() // Usa snapshotChanges para acceder a los datos y metadatos
      .pipe(
        take(1), // Asegura que solo se accede una vez a los datos
        map(changes => changes.length > 0) // Transforma el resultado a un valor booleano
      );
  }

  existeOrlaPorNombre(nombre: string): Observable<boolean> {
    nombre = nombre.toLowerCase(); // Convertir el nombre a minúsculas para la comparación
    return this.db.list('/orlas', ref => ref.orderByChild('nombre').equalTo(nombre))
      .snapshotChanges() // Usa snapshotChanges para acceder a los datos y metadatos
      .pipe(
        take(1), // Asegura que solo se accede una vez a los datos
        map(changes => changes.length > 0) // Transforma el resultado a un valor booleano
      );
  }

  /* 
   existeAlumnoPorNombre(nombre: string): Observable<boolean> {
    nombre = nombre.toLowerCase(); // Convertir el nombre a minúsculas para la comparación
    return this.db.list('/alumnos', ref => ref.orderByChild('nombreParaComparar').equalTo(nombre))
      .valueChanges()
      .pipe(
        map(alumnos => alumnos.length > 0) // Si hay alumnos, significa que el nombre ya existe
      );
  }
  */

  // Agrega esto dentro de tu clase AlumnosComponent
  getAlumnos() {
    return this.obtenerDatos('alumnos').pipe(
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

  getProfesores() {
    return this.obtenerDatos('profesores').pipe(
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

  getOrlas() {
    return this.obtenerDatos('orlas').pipe(
      tap(data => console.log('Orlas recibidas desde Firebase:', data)), // Agrega esto
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

  agregarDatosOrla(datos: any, nodo: string, nombre: string): Observable<any> {
    return this.http.put(`${this.firebaseUrl}/${nodo}/${nombre}.json?auth=${this.authService.getAuthTokenCookie()}`, datos);
  }
  agregarProfesoresOrla(datos: any, nodo: string, nombreOrla: string): Observable<any> {
    return this.http.put(`${this.firebaseUrl}/${nodo}/${nombreOrla}/profesores.json?auth=${this.authService.getAuthTokenCookie()}`, datos);
  }
  agregarAlumnosOrla(datos: any, nodo: string, nombreOrla: string): Observable<any> {
    return this.http.put(`${this.firebaseUrl}/${nodo}/${nombreOrla}/alumnos.json?auth=${this.authService.getAuthTokenCookie()}`, datos);
  }
  /*obtenerProfesoresPorId(id: string): Observable<any> {
    return this.http.get(`${this.firebaseUrl}/orlas/profesores/${id}.json?auth=${this.authService.getToken}`).pipe(
        map(response => {
            // Aquí puedes agregar lógica adicional si es necesario, por ejemplo, manejar casos donde el alumno no existe
            return response; // Devuelve los datos del alumno
        })
    );
}*/

// Método para obtener un profesor por ID
obtenerProfesorPorId(id: string): Observable<any> {
  return this.http.get(`${this.firebaseUrl}/profesores/${id}.json?auth=${this.authService.getAuthTokenCookie()}`);
}

obtenerAlumnoPorId(id: string): Observable<any> {
  return this.http.get(`${this.firebaseUrl}/alumnos/${id}.json?auth=${this.authService.getAuthTokenCookie()}`);
}

}
