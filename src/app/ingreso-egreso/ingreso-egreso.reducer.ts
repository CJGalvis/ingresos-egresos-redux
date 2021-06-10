import { createReducer, on } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import * as actions from './ingreso-egreso.actions';

export interface State {
  items: Array<IngresoEgreso>;
}

export interface AppStateWithIngresoEgreso extends AppState {
  ingresosEgresos: State
}

export const initialState: State = {
  items: [],
};

const _ingresoEgresoReducer = createReducer(
  initialState,
  on(actions.setIngresoEgreso, (state, { data }) => ({
    ...state,
    items: [...data],
  })),
  on(actions.unSetIngresoEgreso, (state) => ({ ...state, items: [] }))
);

export function ingresoEgresoReducer(state, action) {
  return _ingresoEgresoReducer(state, action);
}
