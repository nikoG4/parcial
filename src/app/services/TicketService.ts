import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, deleteDoc, updateDoc, addDoc } from '@angular/fire/firestore';
import { Ticket } from '../models/Ticket';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private path = 'tickets';
  private firestore = inject(Firestore);

  getAll(): Observable<Ticket[]> {
    const ref = collection(this.firestore, this.path);
    return collectionData(ref, { idField: 'id' }) as Observable<Ticket[]>;
  }

  add(loan: Ticket): Promise<any> {
    const ref = collection(this.firestore, this.path);
    return addDoc(ref, loan);
  }

  update(id: string, loan: Ticket): Promise<void> {
    const ref = doc(this.firestore, `${this.path}/${id}`);
    return updateDoc(ref, { ...loan });
  }

  delete(id: string): Promise<void> {
    const ref = doc(this.firestore, `${this.path}/${id}`);
    return deleteDoc(ref);
  }
}
