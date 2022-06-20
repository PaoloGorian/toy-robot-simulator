import {Cell} from "../../cell/interfaces/cell.interface";
import {OrientationEnum} from "../../enums/orientation.enum";

export interface BoardState {
  boardCells: Cell[];
  isInitiated: boolean;
  robotOrientation: OrientationEnum;
}

export const initialBoardState: BoardState = {
  boardCells: [],
  isInitiated: false,
  robotOrientation: OrientationEnum.North
}
