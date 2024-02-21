import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, take } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private firebaseUrl = 'DBURL_GOES_HERE/';
  //private apiUrl = 'https://tu-api.com/datos';

  constructor(private http: HttpClient, private authService: AuthService, private db: AngularFireDatabase) {

  }

  agregarDatos(datos: any, nodo: string): Observable<any> {
    const datosConComparacion = {
      ...datos,
      nombreParaComparar: datos.nombre.toLowerCase(), // Agregar campo en minúsculas
    };

    return this.http.post(`${this.firebaseUrl}/${nodo}.json?auth=${this.authService.getToken}`, datosConComparacion);
  }

  obtenerDatos(nodo: string): Observable<any> {
    return this.http.get(`${this.firebaseUrl}/${nodo}.json?auth=${this.authService.getToken}`);
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
    const datosConComparacion = {
      ...datosActualizados,
      nombreParaComparar: datosActualizados.nombre.toLowerCase(), // Agregar campo en minúsculas
    };
    const url = `${this.firebaseUrl}${nodo}/${id}.json?auth=${this.authService.getToken}`;
    return this.http.put<any>(url, datosActualizados);
  }

  eliminarRegistro(id: string, nodo: string): Observable<void> {
    const url = `${this.firebaseUrl}${nodo}/${id}.json?auth=${this.authService.getToken}`;
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


}
