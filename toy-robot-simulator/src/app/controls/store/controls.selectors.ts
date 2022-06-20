import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ControlsState} from "./controls.state";

export const controlsState = createFeatureSelector<ControlsState>('controls');

export const lastMove = createSelector(
  controlsState,
  (state: ControlsState) =>
    state.lastMove
);

export const lastLog = createSelector(
  controlsState,
  (state: ControlsState) =>
    state.lastLog
);
