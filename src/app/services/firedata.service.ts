/* eslint-disable @typescript-eslint/quotes */
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FiredataService {

  constructor(private firestore: AngularFirestore) { }

  async create(collection: string, dato: unknown) {
    try {
      return await this.firestore.collection(collection).add(dato);
    } catch (error) {
      console.log("error en: create ", error);
    }
  }
  async getAll(collection: string) {
    try {
      return await this.firestore.collection(collection).snapshotChanges();
    } catch (error) {
      console.log("error en: getAll ", error);
    }
  }


  async getById(collection: string, id: string) {
    try {
      return await this.firestore.collection(collection).doc(id).get();
    } catch (error) {
      console.log("error en: getById ", error);
    }
  }


  async delete(collection: string, id: string) {
    try {
      return await this.firestore.collection(collection).doc(id).delete();
    } catch (error) {
      console.log("error en: delete ", error);
    }
  }


  async update(collection: string, id: string, dato: unknown) {
    try {
      return await this.firestore.collection(collection).doc(id).set(dato);
    } catch (error) {
      console.log("error en: update ", error);
    }
  }
}
