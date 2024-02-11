import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor() { }

  uploadFile(filePath: string, file: File): Promise<any> {
    const storageRef = firebase.storage().ref(filePath);
    return storageRef.put(file).then((snapshot) =>
      snapshot.ref.getDownloadURL());
  }
  deleteFile(filePath: string): Promise<void> {
    const storageRef = firebase.storage().ref(filePath);
    return storageRef.delete();
  }

}
