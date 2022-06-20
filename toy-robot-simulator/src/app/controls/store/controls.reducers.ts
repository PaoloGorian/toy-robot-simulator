import {createReducer, on} from "@ngrx/store";

import cloneDeep from "lodash/cloneDeep";

import * as fromActions from "./controls.actions";
import {initialControlsState} from "./controls.state";
import {newState} from "../../helper/helper";

export const controlsReducer = createReducer(
  cloneDeep(initialControlsState),
  on(fromActions.LeftCmd, (state, action) => {
    const lastLog = `Successful left rotation`;
    const lastMove = `${action.type}`;
    return newState(state, {
      lastLog,
      lastMove
    })
  }),
  on(fromActions.MoveCmd, (state, action) => {
    const lastLog = `Successful place to (${action.x}, ${action.y})`;
    const lastMove = `${action.type} (${action.x}, ${action.y})`;
    return newState(state, {
      lastLog,
      lastMove
    })
  }),
  on(fromActions.PlaceCmd, (state, action) => {
    const lastLog = `Successful place to (${action.x}, ${action.y}), ${action.orientation}`;
    const lastMove = `${action.type} (${action.x}, ${action.y}) ${action.orientation}`;
    return newState(state, {
      lastLog,
      lastMove
    });
  }),
  on(fromActions.RightCmd, (state, action) => {
    const lastLog = `Successful right rotation`;
    const lastMove = `${action.type}`;
    return newState(state, {
      lastLog,
      lastMove
    })
  })
)
