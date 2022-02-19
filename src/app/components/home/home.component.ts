import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string = '9 x 9 Sudoku Solver'
  isNavbarAccent: boolean = false
  navbarColor: string = 'primary'
  madeBy: string = 'Made by'
  mailId: string = 'r.antony67@gmail.com'

  constructor() { }

  ngOnInit(): void {
  }

  toggleNavbarColor(){
    if (!this.isNavbarAccent) 
      this.navbarColor = 'accent'
    else
      this.navbarColor = 'primary'
  }

  changeBtnText(){
    if (this.madeBy === 'Made by')
      this.madeBy = this.mailId
    else
      this.madeBy = 'Made by'
  }

}
