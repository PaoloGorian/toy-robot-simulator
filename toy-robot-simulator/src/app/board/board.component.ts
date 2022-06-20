import {Component, OnInit} from '@angular/core';
import {Cell} from "../cell/interfaces/cell.interface";
import {BoardFacade} from "./store/board.facade";
import {Observable} from "rxjs";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  cells$: Observable<Cell[]>;

  constructor(private boardFacade: BoardFacade) {
  }

  ngOnInit(): void {
    this.cells$ = this.boardFacade.getBoardCells$();
  }
}
