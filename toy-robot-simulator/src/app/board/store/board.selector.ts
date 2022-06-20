import {createFeatureSelector, createSelector} from "@ngrx/store";
import {BoardState} from "./board.state";

export const boardState = createFeatureSelector<BoardState>('board');

export const boardCells = createSelector(
  boardState,
  (state: BoardState) =>
    state.boardCells
);

export const robotOrientation = createSelector(
  boardState,
  (state: BoardState) =>
    state.robotOrientation
);


export const robotPosition = createSelector(
  boardState,
  (state: BoardState) =>
    state.boardCells
      .filter(c => c.hasRobot)
      .map(r => {
        return {
          x: r.xPosition,
          y: r.yPosition
        }
      })[0]
);


