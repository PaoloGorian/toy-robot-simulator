import {Injectable} from "@angular/core";

import {Store} from "@ngrx/store";
import {Observable} from "rxjs";

import * as fromSelectors from "./board.selector";
import * as fromActions from "./board.actions";
import {BoardState} from "./board.state";
import {Cell} from "../../cell/interfaces/cell.interface";
import {OrientationEnum} from "../../enums/orientation.enum";

@Injectable({
  providedIn: 'root'
})
export class BoardFacade {
  constructor(private boardStore$: Store<BoardState>) {
  }

  loadBoard(boardCells: Cell[], orientation: OrientationEnum): void {
    this.boardStore$.dispatch(fromActions.LoadBoard({boardCells, orientation}))
  }

  getBoardCells$(): Observable<Cell[]> {
    return this.boardStore$.select(fromSelectors.boardCells);
  }

  getRobotOrientation$(): Observable<OrientationEnum> {
    return this.boardStore$.select(fromSelectors.robotOrientation);
  }

  getRobotPosition$(): Observable<{ x: number, y: number }> {
    return this.boardStore$.select(fromSelectors.robotPosition);
  }

}
