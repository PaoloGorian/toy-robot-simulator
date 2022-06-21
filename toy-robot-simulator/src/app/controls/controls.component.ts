import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

import {environment} from "../../environments/environment";
import {ControlsFacade} from "./store/controls.facade";
import {OrientationEnum} from "../enums/orientation.enum";
import {BoardFacade} from "../board/store/board.facade";
import {Observable} from "rxjs";

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
  host: {
    '(document:keydown)': 'keydownEvent($event)'
  }
})
export class ControlsComponent implements OnInit {
  @ViewChild('scroll') logContainer: ElementRef;
  private currentOrientation: OrientationEnum;
  private currentPosition: { x: number, y: number };
  lastLogs: string[] = [];
  lastMove$: Observable<string>;
  orientationEnum: OrientationEnum[] = Object.values(OrientationEnum);
  xControl = this.fb.control(0, [Validators.required, Validators.min(0), Validators.max(environment.boardRows - 1)]);
  yControl = this.fb.control(0, [Validators.required, Validators.min(0), Validators.max(environment.boardColumns - 1)]);
  orientationControl = this.fb.control('', Validators.required);
  placeRobotFormGroup = this.fb.group({
    x: this.xControl,
    y: this.yControl,
    orientation: this.orientationControl
  });

  constructor(
    private boardFacade: BoardFacade,
    private controlsFacade: ControlsFacade,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.controlsFacade.getLastLog()
      .subscribe(m => {
        this.lastLogs.unshift(m);
      });

    this.lastMove$ = this.controlsFacade.getLastMove();

    this.boardFacade.getRobotOrientation$()
      .subscribe(o => this.currentOrientation = o);

    this.boardFacade.getRobotPosition$()
      .subscribe(p => this.currentPosition = p);
  }

  onPlaceClick(): void {
    this.placeRobotFormGroup.valid &&
    this.controlsFacade.placeCommand(this.xControl.value, this.yControl.value, this.orientationControl.value);
  }

  keydownEvent($event: KeyboardEvent): void {
    switch ($event.key) {
      case 'ArrowUp': {
        const newPosition = this.calculateNextRobotPosition();
        this.isMoveValid(newPosition)
          ? this.controlsFacade.moveCommand(newPosition.x, newPosition.y)
          : this.controlsFacade.invalidCommand(newPosition.x, newPosition.y);
        break;
      }
      case 'ArrowLeft': {
        const newOrientation = this.calculateNextRobotOrientation(false);
        this.controlsFacade.leftCommand(newOrientation);
        break;
      }
      case 'ArrowRight': {
        const newOrientation = this.calculateNextRobotOrientation(true);
        this.controlsFacade.rightCommand(newOrientation);
        break;
      }
      default:
        break;
    }
  }

  private calculateNextRobotPosition(): { x: number, y: number } {
    let newPosition: { x: number, y: number };
    switch (this.currentOrientation) {
      case OrientationEnum.North: {
        newPosition = {...this.currentPosition, x: this.currentPosition.x - 1};
        break;
      }
      case OrientationEnum.East: {
        newPosition = {...this.currentPosition, y: this.currentPosition.y + 1};
        break;
      }
      case OrientationEnum.South: {
        newPosition = {...this.currentPosition, x: this.currentPosition.x + 1};
        break;
      }
      case OrientationEnum.West: {
        newPosition = {...this.currentPosition, y: this.currentPosition.y - 1};
        break;
      }
      default:
        newPosition = {...this.currentPosition};
    }
    return newPosition;
  }

  private isMoveValid(position: { x: number, y: number }): boolean {
    return 0 <= position.x
      && position.x < environment.boardRows
      && 0 <= position.y
      && position.y < environment.boardColumns;
  }

  private calculateNextRobotOrientation(isClockwise: boolean): OrientationEnum {
    let newOrientation;
    switch (this.currentOrientation) {
      case OrientationEnum.North: {
        isClockwise
          ? newOrientation = OrientationEnum.East
          : newOrientation = OrientationEnum.West;
        break;
      }
      case OrientationEnum.East: {
        isClockwise
          ? newOrientation = OrientationEnum.South
          : newOrientation = OrientationEnum.North;
        break;
      }
      case OrientationEnum.South: {
        isClockwise
          ? newOrientation = OrientationEnum.West
          : newOrientation = OrientationEnum.East;
        break;
      }
      case OrientationEnum.West: {
        isClockwise
          ? newOrientation = OrientationEnum.North
          : newOrientation = OrientationEnum.South;
        break;
      }
      default:
        newOrientation = OrientationEnum.North;
    }
    return newOrientation;
  }
}
