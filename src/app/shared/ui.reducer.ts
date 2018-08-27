import { State } from './../app.reducer';
import { Action } from '@ngrx/store';
import { UIActions, START_LOADING, STOP_LOADING } from './ui.actions';
// create a reducer only for the isLoading state
export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

export function uiReducer(state = initialState, action: Action) {
  switch (action.type) {
    case START_LOADING:
      return {
        isLoading: true
      };
    case STOP_LOADING:
      return {
        isLoading: false
      };
    default: {
      return state;
    }
  }
}

export const getIsLoading = (state: State) => state.isLoading;
