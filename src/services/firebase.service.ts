import { Injectable } from '@angular/core';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private firebaseConfig = {
    apiKey: "KEY_GOES_HERE",
    authDomain: "DOMAIN_GOES_HERE",
    databaseURL: "DBURL_GOES_HERE",
    projectId: "laorlabeda",
    storageBucket: "STORAGEBUCKET_GOES_HERE",
    messagingSenderId: "SENDERID_GOES_HERE",
    appId: "APPID_GOES_HERE"
  };

  private app = this.initializeFirebase();

  constructor() { }

  private initializeFirebase() {
    // Verifica si ya existen instancias de la aplicación de Firebase para evitar errores de inicialización múltiple
    if (!getApps().length) {
      return initializeApp(this.firebaseConfig);
    } else {
      return getApp(); // Si ya está inicializada, retorna la instancia existente
    }
  }

  getAuth() {
    return getAuth(this.app);
  }


}
