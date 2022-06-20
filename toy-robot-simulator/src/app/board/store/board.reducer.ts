import {createReducer, on} from "@ngrx/store";

import cloneDeep from "lodash/cloneDeep";

import * as fromActions from "./board.actions";
import {initialBoardState} from "./board.state";
import {newState} from "../../helper/helper";
import {Cell} from "../../cell/interfaces/cell.interface";

export const boardReducer = createReducer(
  cloneDeep(initialBoardState),
  on(fromActions.LoadBoard, (state, action) => {
    let nextState = {...state};
    if (!state.isInitiated) {
      nextState = newState(state, {
        isInitiated: true,
        robotOrientation: action.orientation,
        boardCells: action.boardCells
      });
    }
    return nextState;
  }),
  on(fromActions.UpdateRobotOrientation, (state, action) => {
    return newState(state, {
      robotOrientation: action.orientation
    });
  }),
  on(fromActions.UpdateRobotPosition, (state, action) => {
    const newX = action.x;
    const newY = action.y;
    const updatedBoardCells = state.boardCells
      .map((cell: Cell) => {
        let newCell: Cell;
        cell.xPosition === newX && cell.yPosition === newY
          ? newCell = {...cell, hasRobot: true}
          : newCell = {...cell, hasRobot: false};
        return newCell;
      });
    return newState(state, {
      boardCells: updatedBoardCells,
      robotOrientation: action.orientation
    });
  })
)
