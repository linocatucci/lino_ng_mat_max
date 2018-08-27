import { Action } from '@ngrx/store';
// variables with string to avoid misplelling in the applicaiton.
export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';

// actions as classes so that we get auto completion and ts support
export class StartLoading implements Action {
  readonly type = START_LOADING;
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

export type UIActions = StartLoading | StopLoading;
