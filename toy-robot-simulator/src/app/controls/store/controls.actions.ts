import {createAction, props} from "@ngrx/store";
import {OrientationEnum} from "../../enums/orientation.enum";

export enum ControlsActionsType {
  INVALID_COM = '[Controls] Invalid command',
  PLACE_CMD = '[Controls] Place command',
  MOVE_CMD = '[Controls] Move command',
  LEFT_CMD = '[Controls] Left rotation command',
  RIGHT_CMD = '[Controls] Right rotation command'
}

export const InvalidCmd = createAction(
  ControlsActionsType.INVALID_COM,
  props<{ x: number, y: number }>()
)

export const LeftCmd = createAction(
  ControlsActionsType.LEFT_CMD,
  props<{ orientation: OrientationEnum }>()
)

export const MoveCmd = createAction(
  ControlsActionsType.MOVE_CMD,
  props<{ x: number, y: number }>()
)

export const PlaceCmd = createAction(
  ControlsActionsType.PLACE_CMD,
  props<{ x: number, y: number, orientation: OrientationEnum }>()
)

export const RightCmd = createAction(
  ControlsActionsType.RIGHT_CMD,
  props<{ orientation: OrientationEnum }>()
)
