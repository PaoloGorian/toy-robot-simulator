import {Injectable} from "@angular/core";

import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, withLatestFrom} from "rxjs/operators";

import * as fromControlsActions from "./controls.actions";
import * as fromBoardActions from "../../board/store/board.actions";
import * as fromBoardSelectors from "../../board/store/board.selector";
import {BoardState} from "../../board/store/board.state";
import {Store} from "@ngrx/store";

@Injectable()
export class ControlsEffects {

  leftCommand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromControlsActions.LeftCmd),
      map((action) => {
        return fromBoardActions.UpdateRobotOrientation({
          orientation: action.orientation
        });
      })
    ));

  moveCommand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromControlsActions.MoveCmd),
      withLatestFrom(this.boardStore$.select(fromBoardSelectors.robotOrientation)),
      map(([action, orientation]) => {
        return fromBoardActions.UpdateRobotPosition({
          x: action.x,
          y: action.y,
          orientation: orientation
        });
      })
    ));

  placeCommand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromControlsActions.PlaceCmd),
      map((action) => {
        return fromBoardActions.UpdateRobotPosition({
          x: action.x,
          y: action.y,
          orientation: action.orientation
        });
      })
    ));

  rightCommand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromControlsActions.RightCmd),
      map((action) => {
        return fromBoardActions.UpdateRobotOrientation({
          orientation: action.orientation
        });
      })
    ));

  constructor(
    private actions$: Actions,
    private boardStore$: Store<BoardState>
  ) {
  }

}
