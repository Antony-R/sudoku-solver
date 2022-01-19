import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SolverService } from 'src/app/services/solver.service';
import { HowToUseDialogComponent } from '../how-to-use-dialog/how-to-use-dialog.component';
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

  // grid: number[][] = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]
  // initialGrid: number[][] = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]
  // inputGrid: number[][] = []
  grid: any[][] = [
                  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
                  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
                  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
                  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
                  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
                  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
                  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
                  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
                  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]]
  
  initialGrid: any[][] = [
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]]

  inputGrid: any[][] = []
  inputIndex: Set<String> = new Set()

  constructor(private solverService: SolverService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSubmit(sudoku: any){
    this.inputGrid = []
    this.inputIndex = new Set()
    let index: number = 0
    for(let i = 0; i < 9; i++){
      this.inputGrid.push([])
      for (let j = 0; j < 9; j++){
        let numberAtCurCell: number = Number(sudoku[index++].value)
        this.inputGrid[i].push(numberAtCurCell)
        if (numberAtCurCell !== 0)
          this.inputIndex.add(i + "," + j)
      }
    }
    let validCheck = this.solverService.isValidInput(this.inputGrid)
    if (validCheck.isValid){
      this.grid = this.solverService.getSolution(this.inputGrid)
      this.openSolvedDialog()
    }
    else {
      InvalidDialogComponent.errorMsg = validCheck.message
      this.openInvalidDialog()
    }
  }

  openInvalidDialog(){
    this.dialog.open(InvalidDialogComponent)
  }

  openHowToUseDialog(){
    this.dialog.open(HowToUseDialogComponent)
  }

  openSolvedDialog(){
    this.dialog.open(PuzzleSolvedDialogComponent)
  }

  onReset(){
    this.grid = this.initialGrid
    this.inputIndex = new Set()
  }

}
