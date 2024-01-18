import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc,collection, collectionData, query } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { Viaje } from '../models/viaje.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);

  // ====================== Autenticacion ======================

  getAuth() {
    return getAuth();
  }

  // === Acceder ===

  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // === Crear ===

  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // === Actualizar ===

  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  // === Reestablecer ===

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  // === Cerrar Sesion ===

  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth');
  }

  // ====================== Base de datos ======================

  // === Documento ===

  async eliminarViaje(viajeId: string): Promise<void> {
    // Referencia al documento que se eliminará
    const viajeRef = this.firestore.collection('viajes').doc(viajeId);

    // Intenta eliminar el documento
    try {
      await viajeRef.delete();
    } catch (error) {
      // Maneja el error, si es necesario
      console.error('Error al eliminar el viaje:', error);
      throw error; // Puedes lanzar el error nuevamente para manejarlo en el componente
    }
  }

  actualizarViaje(viajeId: string, nuevosDatos: Viaje): Promise<void> {
    const viajesCollection = this.firestore.collection('viajes'); // Reemplaza 'viajes' con el nombre real de tu colección

    // Utiliza el método 'update' para actualizar los datos del viaje
    return viajesCollection.doc(viajeId).update(nuevosDatos);
  }

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }


  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  getCollectionData(path: string, collectionQuery?:any){
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collectionQuery), {idField: 'id'});
  }
}
