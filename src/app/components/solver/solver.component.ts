import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SolverService } from 'src/app/services/solver.service';
import { HowToUseDialogComponent } from '../how-to-use-dialog/how-to-use-dialog.component';
import { InvalidDialogComponent } from '../invalid-dialog/invalid-dialog.component';
import { PuzzleSolvedDialogComponent } from '../puzzle-solved-dialog/puzzle-solved-dialog.component';
import { solution } from 'src/app/models/solution';

@Component({
  selector: 'app-solver',
  templateUrl: './solver.component.html',
  styleUrls: ['./solver.component.css']
})
export class SolverComponent implements OnInit {

  @Input() theme: string = '';
  @Input() resetColor: string = '';

  grid: any[][] = []
  solutionCache: any[][] = []
  currentRow: number = -1
  currentCol: number = -1
  
  initialGrid: any[][] = []

  inputGrid: any[][] = []
  inputIndex: Set<String> = new Set()

  intervalId: any = null
  seeSteps: any = false
  skipToEnd: boolean = false
  isSolveEnabled: boolean = true

  constructor(private solverService: SolverService, private dialog: MatDialog) { }

  ngOnInit(): void {
    for (let i = 0; i < 9; i++){
      this.grid.push([])
      this.initialGrid.push([])
      for (let j = 0; j < 9; j++){
        this.grid[i].push(undefined)
        this.initialGrid[i].push(undefined)
      }
    }
  }

  onSubmit(sudoku: any){
    clearInterval(this.intervalId)
    this.skipToEnd = false
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
    if (this.inputIndex.size == 81) return
    let validCheck = this.solverService.isValidInput(this.inputGrid)
    if (validCheck.isValid){
      this.grid = JSON.parse(JSON.stringify(this.inputGrid))
      let solution: solution = this.solverService.getSolution(this.inputGrid, this.seeSteps)
      this.solutionCache = solution.solvedGrid
      let counter = 0
      if (this.seeSteps){
        this.skipToEnd = true
        this.isSolveEnabled = false
        this.intervalId = setInterval (() => {
          if (counter == solution.steps.length){
            this.openSolvedDialog()
            this.skipToEnd = false
            this.isSolveEnabled = true
            clearInterval(this.intervalId)
          }
          else {
            this.fillGrid(solution.steps[counter])
            this.currentRow = solution.current[counter].row
            this.currentCol = solution.current[counter].col
            counter++
          }
        }, 150)
      }
      else {
        this.grid = JSON.parse(JSON.stringify(solution.solvedGrid))
        this.openSolvedDialog()
      }

    }
    else {
      InvalidDialogComponent.errorMsg = validCheck.message
      this.openInvalidDialog()
    }
  }

  fillGrid(step: number[][]){
    for (let i = 0; i < 9; i++){
      for (let j = 0; j < 9; j++){
        if (step[i][j] === 0){
          this.grid[i][j] = undefined
        }
        else {
          this.grid[i][j] = step[i][j]
        }
      }
    }
  }

  skip(){
    clearInterval(this.intervalId)
    this.seeSteps = false
    this.skipToEnd = false
    this.currentRow = -1
    this.currentCol = -1
    this.grid = JSON.parse(JSON.stringify(this.solutionCache))
    this.solutionCache = []
    this.openSolvedDialog()
    this.isSolveEnabled = true
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
    this.currentRow = -1
    this.currentCol = -1
    clearInterval(this.intervalId)
    this.skipToEnd = false
    this.isSolveEnabled = true
  }

}
