import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
//import firebase from 'firebase/compat/app'
//import 'firebase/compat/storage'

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(private storage: AngularFireStorage) { }

  uploadFile(filePath: string, file: File): Promise<any> {
    const fileRef = this.storage.ref(filePath);
    return this.storage.upload(filePath, file).then(() =>
      fileRef.getDownloadURL().toPromise());
  }

  deleteFile(filePath: string): Promise<void> {
    const fileRef = this.storage.refFromURL(filePath);
    return fileRef.delete().toPromise();
  }

  /*uploadFile(filePath: string, file: File): Promise<any> {
    const storageRef = firebase.storage().ref(filePath);
    return storageRef.put(file).then((snapshot) =>
      snapshot.ref.getDownloadURL());
  }
  deleteFile(filePath: string): Promise<void> {
    const storageRef = firebase.storage().ref(filePath);
    return storageRef.delete();
  }*/

}
