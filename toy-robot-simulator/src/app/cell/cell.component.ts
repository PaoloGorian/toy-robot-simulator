import {Component, Input, OnInit} from '@angular/core';

import {Cell} from "./interfaces/cell.interface";
import {BoardFacade} from "../board/store/board.facade";
import {OrientationEnum} from "../enums/orientation.enum";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {state, style, trigger} from "@angular/animations";

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  animations: [
    trigger('robotAnimation',[
      state(OrientationEnum.North, style({ transform: 'rotate(0)' })),
      state(OrientationEnum.East, style({ transform: 'rotate(90deg)' })),
      state(OrientationEnum.South, style({ transform: 'rotate(180deg)' })),
      state(OrientationEnum.West, style({ transform: 'rotate(-90deg)' }))
      ])
  ]
})
export class CellComponent implements OnInit {
  @Input() cell: Cell;

  orientation$: Observable<OrientationEnum>;
  hasRobot$: Observable<boolean>;

  constructor(private boardFacade: BoardFacade) {
  }

  ngOnInit(): void {
    this.orientation$ = this.boardFacade.getRobotOrientation$();
    this.hasRobot$ = this.boardFacade.getRobotPosition$()
      .pipe(
        map((robotPos: { x: number, y: number }) =>
          robotPos.x === this.cell.xPosition && robotPos.y === this.cell.yPosition
        ));
  }

}
