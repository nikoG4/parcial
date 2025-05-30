import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc, updateDoc, addDoc } from '@angular/fire/firestore';
import { Cliente } from '../models/Cliente';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private path = 'clientes';
  private firestore = inject(Firestore);

 getAll(): Observable<Cliente[]> {
    const clientesCollection = collection(this.firestore, this.path);
    return collectionData(clientesCollection, { idField: 'id' }) as Observable<Cliente[]>;
  }

  add(cliente: Cliente): Promise<any> {
    const clientesCollection = collection(this.firestore, this.path);
    return addDoc(clientesCollection, cliente);
  }

  update(id: string, cliente: Cliente): Promise<void> {
    const clienteDocRef = doc(this.firestore, `${this.path}/${id}`);
    return updateDoc(clienteDocRef, { ...cliente });
  }

  delete(id: string): Promise<void> {
    const clienteDocRef = doc(this.firestore, `${this.path}/${id}`);
    return deleteDoc(clienteDocRef);
  }
}
