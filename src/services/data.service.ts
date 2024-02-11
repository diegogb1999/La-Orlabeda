import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private firebaseUrl = 'DBURL_GOES_HERE/';
  private nodo = "usuarios";
  //private apiUrl = 'https://tu-api.com/datos';

  constructor(private http: HttpClient,  private authService: AuthService) {

  }

  agregarDatos(datos: any): Observable<any> {
    return this.http.post(`${this.firebaseUrl}/${this.nodo}.json?auth=${this.authService.getToken}`, datos);
  }

  obtenerDatos(): Observable<any> {
    return this.http.get(`${this.firebaseUrl}/${this.nodo}.json?auth=${this.authService.getToken}`);
  }

  actualizarDatos(id: string, datosActualizados: any): Observable<any> {
    const url = `${this.firebaseUrl}${this.nodo}/${id}.json?auth=${this.authService.getToken}`;
    return this.http.put<any>(url, datosActualizados);
  }

  eliminarRegistro(id: string): Observable<void> {
    const url = `${this.firebaseUrl}${this.nodo}${id}.json?auth=${this.authService.getToken}`;
    return this.http.delete<void>(url);
    }

}
