import {Component, OnInit} from '@angular/core';

import {environment} from "../environments/environment";
import {Cell} from "./cell/interfaces/cell.interface";
import {BoardFacade} from "./board/store/board.facade";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'TOY ROBOT SIMULATOR';

  constructor(private boardFacade: BoardFacade) {
  }

  ngOnInit(): void {
    const cells: Cell[] = [];
    for (let i = 0; i < environment.boardRows; i++) {
      for (let j = 0; j < environment.boardColumns; j++) {
        let hasRobot;
        i === environment.initialX && j === environment.initialY
          ? hasRobot = true
          : hasRobot = false
        cells.push({ hasRobot, xPosition: i, yPosition: j })
      }
    }
    this.boardFacade.loadBoard(cells, environment.initialOrientation);
  }
}
