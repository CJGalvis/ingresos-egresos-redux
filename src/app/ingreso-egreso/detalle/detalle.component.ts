import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngresoEgreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  public itemsIngresoEgreso: Array<IngresoEgreso> = [];
  private ingresoEgresoSubscription: Subscription;

  constructor(
    private store: Store<AppStateWithIngresoEgreso>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.ingresoEgresoSubscription = this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => (this.itemsIngresoEgreso = items));
  }

  ngOnDestroy() {
    this.ingresoEgresoSubscription.unsubscribe();
  }

  deleteItem(uid: string) {
    this.ingresoEgresoService
      .deleteIngresoEgreso(uid)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Data deleted success',
          timer: 1500,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error al eliminar el elemento',
        });
      });
  }
}
