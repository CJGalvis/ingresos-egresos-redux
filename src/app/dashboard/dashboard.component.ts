import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import {
  setIngresoEgreso,
  unSetIngresoEgreso,
} from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private uid: string;
  private uiSubscription: Subscription;
  private ingresoEgresoSubscription: Subscription;

  constructor(
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.uiSubscription = this.store.select('auth').subscribe(({ user }) => {
      this.uid = user?.uid;
      if (!this.uid) return;
      this.ingresoEgresoSubscription = this.ingresoEgresoService
        .getIngresosEgresosListener(this.uid)
        .subscribe((items) => {
          this.store.dispatch(setIngresoEgreso({ data: [...items] }));
        });
    });
  }

  ngOnDestroy() {
    this.uiSubscription?.unsubscribe();
    this.ingresoEgresoSubscription?.unsubscribe();
    this.store.dispatch(unSetIngresoEgreso());
  }
}
