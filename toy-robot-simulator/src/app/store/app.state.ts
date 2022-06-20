import {ControlsState} from "../controls/store/controls.state";
import {BoardState} from "../board/store/board.state";

export interface AppState {
  board: BoardState;
  controls: ControlsState;
}
