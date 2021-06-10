import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { isLoading, stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoEgresoForm: FormGroup;
  type: string = 'I';
  private uiSubscription: Subscription;
  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.builForm();
    this.getUiState();
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  getUiState() {
    this.uiSubscription = this.store
      .select('ui')
      .subscribe((ui) => (this.isLoading = ui.isLoading));
  }

  builForm() {
    this.ingresoEgresoForm = this.fb.group({
      description: new FormControl('', Validators.required),
      monto: new FormControl('', Validators.required),
    });
  }

  save() {
    if (this.ingresoEgresoForm.invalid) return;
    this.store.dispatch(isLoading());
    const { description, monto } = this.ingresoEgresoForm.value;
    const newData = new IngresoEgreso(description, monto, this.type);
    this.ingresoEgresoService
      .createIngresoEgreso({ ...newData })
      .then((value: any) => {
        this.ingresoEgresoForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Data registered success',
          timer: 1500,
        });
        this.store.dispatch(stopLoading());
      })
      .catch((error: any) => {
        this.store.dispatch(stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  }
}
