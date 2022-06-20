import {Injectable} from "@angular/core";

import {Store} from "@ngrx/store";

import * as fromActions from "./controls.actions";
import * as fromSelectors from "./controls.selectors";
import {ControlsState} from "./controls.state";
import {OrientationEnum} from "../../enums/orientation.enum";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ControlsFacade {
  constructor(private controlsStore$: Store<ControlsState>) {
  }

  getLastMove(): Observable<string> {
    return this.controlsStore$.select(fromSelectors.lastMove)
  }

  getLastLog(): Observable<string> {
    return this.controlsStore$.select(fromSelectors.lastLog)
  }

  invalidCommand(x: number, y: number): void {
    this.controlsStore$.dispatch(fromActions.InvalidCmd({
      x, y
    }))
  }

  leftCommand(orientation: OrientationEnum): void {
    this.controlsStore$.dispatch(fromActions.LeftCmd({
      orientation
    }));
  }

  moveCommand(x: number, y: number): void {
    this.controlsStore$.dispatch(fromActions.MoveCmd({
      x, y
    }))
  }

  placeCommand(x: number, y: number, orientation: OrientationEnum): void {
    this.controlsStore$.dispatch(fromActions.PlaceCmd({
      x, y, orientation
    }));
  }

  rightCommand(orientation: OrientationEnum): void {
    this.controlsStore$.dispatch(fromActions.RightCmd({
      orientation
    }));
  }

}
