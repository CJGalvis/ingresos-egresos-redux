import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppStateWithIngresoEgreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [],
})
export class EstadisticaComponent implements OnInit, OnDestroy {
  // Doughnut
  public doughnutChartLabels: Array<Label> = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartType: ChartType = 'doughnut';

  private ingresoEgresoSubscription: Subscription;
  public totalIngresos: number = 0;
  public totalEgresos: number = 0;
  public ingresosCount: number = 0;
  public egresosCount: number = 0;

  constructor(private store: Store<AppStateWithIngresoEgreso>) {}

  ngOnInit(): void {
    this.ingresoEgresoSubscription = this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => {
        this.ingresosCount = items.filter((value) => value.type == 'I').length;
        this.egresosCount = items.filter((value) => value.type == 'E').length;

        this.totalIngresos = items.reduce((monto, item) => {
          return item.type == 'I' ? monto + item.monto : monto;
        }, 0);

        this.totalEgresos = items.reduce((monto, item) => {
          return item.type == 'E' ? monto + item.monto : monto;
        }, 0);

        this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];
      });
  }

  ngOnDestroy() {
    this.ingresoEgresoSubscription.unsubscribe();
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
