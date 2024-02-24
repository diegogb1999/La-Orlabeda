import { Injectable } from '@angular/core';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  private app = this.initializeFirebase();

  constructor() { }

  private initializeFirebase() {
    if (!getApps().length) {
      return initializeApp(environment.firebase);
    } else {
      return getApp();
    }
  }

  getAuth() {
    return getAuth(this.app);
  }


}
