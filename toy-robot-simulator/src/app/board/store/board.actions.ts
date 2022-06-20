import {createAction, props} from "@ngrx/store";

import {Cell} from "../../cell/interfaces/cell.interface";
import {OrientationEnum} from "../../enums/orientation.enum";

export enum BoardActionsType {
  LOAD_BOARD = '[Board] Load board',
  UPDATE_ROBOT_POSITION = '[Board] Update robot position',
  UPDATE_ROBOT_ORIENTATION = '[Board] Updated robot orientation'
}

export const LoadBoard = createAction(
  BoardActionsType.LOAD_BOARD,
  props<{ boardCells: Cell[], orientation: OrientationEnum }>()
);

export const UpdateRobotOrientation = createAction(
  BoardActionsType.UPDATE_ROBOT_ORIENTATION,
  props<{ orientation: OrientationEnum }>()
);

export const UpdateRobotPosition = createAction(
  BoardActionsType.UPDATE_ROBOT_POSITION,
  props<{ x: number, y: number, orientation: OrientationEnum }>()
);
