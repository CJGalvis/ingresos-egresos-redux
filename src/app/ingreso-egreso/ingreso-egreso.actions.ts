import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const setIngresoEgreso = createAction(
  '[IngresoEgreso] setIngresoEgreso',
  props<{ data: Array<IngresoEgreso> }>()
);

export const unSetIngresoEgreso = createAction(
  '[IngresoEgreso] unSetIngresoEgreso'
);
