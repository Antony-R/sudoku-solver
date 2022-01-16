import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SolverService } from 'src/app/services/solver.service';
import { InvalidDialogComponent } from '../invalid-dialog/invalid-dialog.component';
import { PuzzleSolvedDialogComponent } from '../puzzle-solved-dialog/puzzle-solved-dialog.component';

@Component({
  selector: 'app-solver',
  templateUrl: './solver.component.html',
  styleUrls: ['./solver.component.css']
})
export class SolverComponent implements OnInit {

  @Input() theme: string = '';
  @Input() resetColor: string = '';

  grid: number[][] = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]
  initialGrid: number[][] = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]
  inputGrid: number[][] = []

  constructor(private solverService: SolverService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSubmit(sudoku: any){
    this.inputGrid = []
    let index: number = 0
    for(let i = 0; i < 9; i++){
      this.inputGrid.push([])
      for (let j = 0; j < 9; j++){
        this.inputGrid[i].push(Number(sudoku[index++].value))
      }
    }
    if (this.solverService.isValidInput(this.inputGrid)){
      this.grid = this.solverService.getSolution(this.inputGrid)
      this.openSolvedDialog()
    }
    else {
      this.openInvalidDialog()
    }
  }

  openInvalidDialog(){
    this.dialog.open(InvalidDialogComponent)
  }

  openSolvedDialog(){
    this.dialog.open(PuzzleSolvedDialogComponent)
  }

  onReset(){
    this.grid = this.initialGrid
  }

}
