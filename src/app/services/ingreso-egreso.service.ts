import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  private uid: string;
  constructor(
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) {
    this.store.select('auth').subscribe(({ user }) => {
      this.uid = user?.uid;
    });
  }

  createIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    return this.firestore
      .doc(`${this.uid}/ingreso-egreso`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  getIngresosEgresosListener(uid: string) {
    return this.firestore
      .collection(`${uid}/ingreso-egreso/items`)
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((doc) => ({
            uid: doc.payload.doc.id,
            ...(doc.payload.doc.data() as any),
          }))
        )
      );
  }

  deleteIngresoEgreso(uid: string) {
    return this.firestore.doc(`${this.uid}/ingreso-egreso/items/${uid}`).delete();
  }
}
