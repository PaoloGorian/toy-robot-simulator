import * as fromActions from './board.actions';
import {boardReducer} from "./board.reducer";
import {BoardState, initialBoardState} from "./board.state";
import {OrientationEnum} from "../../enums/orientation.enum";

describe('Board reducer', () => {
  it('It should handle UPDATE_ROBOT_ORIENTATION action', () => {
    const orientation = OrientationEnum.West;
    const action = fromActions.UpdateRobotOrientation({ orientation });
    const result = boardReducer(initialBoardState, action);
    const expectedResult: BoardState = {
      ...initialBoardState,
      robotOrientation: orientation
    };
    expect(result).toEqual(expectedResult);
  });
})
