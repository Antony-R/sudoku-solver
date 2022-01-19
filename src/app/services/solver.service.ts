import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Injectable } from '@angular/core';
import { valid } from '../models/valid';

@Injectable({
  providedIn: 'root'
})
export class SolverService {

  constructor() { }

  getSolution(grid: number[][]){
    globalGrid = grid
    solve()
    return globalGrid
  }

  isValidInput(grid: number[][]): valid{
    let sudokuMap: any = {}
    let validInput: valid = {isValid: false, message: ''}
    for (let i = 0; i < grid.length; i++){
      for (let j = 0; j < grid[0].length; j++){
        if (grid[i][j] !== 0 && grid[i][j] >= 1 && grid[i][j] <= 9){
          let rowCheck = grid[i][j] + " found in row " + i
          let colCheck = grid[i][j] + " found in col " + j 
          let sectorCheck = grid[i][j] + " found in sector " + (Math.floor(i / 3) * 3) + (Math.floor(j / 3) * 3)
          if (rowCheck in sudokuMap || colCheck in sudokuMap || sectorCheck in sudokuMap){
            if (rowCheck in sudokuMap) validInput.message = grid[i][j] + ' present in row ' + (i + 1) + ' multiple times'
            else if (colCheck in  sudokuMap) validInput.message = grid[i][j] + ' present in column ' + (j + 1) + ' multiple times'
            else validInput.message = grid[i][j] + ' present in sector no. ' + sudokuMap[sectorCheck] + ' multiple times'
            return validInput
          }
          else {
            sudokuMap[rowCheck] = grid[i][j]
            sudokuMap[colCheck] = grid[i][j]
            sudokuMap[sectorCheck] =  (Math.floor(i / 3) * 3) + (Math.floor(j / 3)) + 1//sector number
          }
        }
        else if (grid[i][j] < 0 || grid[i][j] > 9){
          validInput.isValid = false
          validInput.message = 'given input is out of bounds'
          return validInput
        }
      }
    }
    validInput.isValid = true
    return validInput
  }

}

var globalGrid: number[][] = []

function isPossible(row: number, col: number, entry: number): boolean {
  //horizontal scan
  for (let i = 0; i < 9; i++){
    if (globalGrid[row][i] === entry) return false
  }
  //vertical scan
  for (let i = 0; i < 9; i++){
    if (globalGrid[i][col] === entry) return false
  }
  //sector scan
  let sectorStartRow: number = Math.floor(row / 3) * 3
  let sectorStartCol: number = Math.floor(col / 3) * 3
  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){
      if (globalGrid[sectorStartRow + i][sectorStartCol + j] === entry) return false
    }
  }
  return true
}

function solve(){
  for (let i = 0; i < 9; i++){
    for (let j = 0; j < 9; j++){
      if (globalGrid[i][j] === 0){
        for (let possible = 1; possible < 10; possible++){
          if (isPossible(i, j, possible)){
            globalGrid[i][j] = possible
            if (solve()) return true
            globalGrid[i][j] = 0
          }
        }
        return false
      }
    }
  }
  return true
}