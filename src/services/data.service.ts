import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private firebaseUrl = 'DBURL_GOES_HERE/';
  private nodo = "alumnos";
  //private apiUrl = 'https://tu-api.com/datos';

  constructor(private http: HttpClient,  private authService: AuthService, private db: AngularFireDatabase) {

  }

  agregarDatos(datos: any, nodo: string): Observable<any> {
    return this.http.post(`${this.firebaseUrl}/${nodo}.json?auth=${this.authService.getToken}`, datos);
  }

  obtenerDatos(nodo: string): Observable<any> {
    return this.http.get(`${this.firebaseUrl}/${nodo}.json?auth=${this.authService.getToken}`);
  }

  actualizarDatos(id: string, datosActualizados: any, nodo: string): Observable<any> {
    const url = `${this.firebaseUrl}${nodo}/${id}.json?auth=${this.authService.getToken}`;
    return this.http.put<any>(url, datosActualizados);
  }

  eliminarRegistro(id: string, nodo: string): Observable<void> {
    const url = `${this.firebaseUrl}${nodo}${id}.json?auth=${this.authService.getToken}`;
    return this.http.delete<void>(url);
    }

    existeAlumnoPorNombre(nombre: string): Observable<boolean> {
      return this.db.list('/alumnos', ref => ref.orderByChild('nombre').equalTo(nombre.toLowerCase()))
        .valueChanges()
        .pipe(
          map(alumnos => alumnos.length > 0)
        );
    }

}
