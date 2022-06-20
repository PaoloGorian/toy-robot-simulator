import {ActionReducerMap} from "@ngrx/store";

import {AppState} from "./app.state";
import {boardReducer} from "../board/store/board.reducer";
import {controlsReducer} from "../controls/store/controls.reducers";

export const appReducer: ActionReducerMap<AppState> = {
  board: boardReducer,
  controls: controlsReducer
}
