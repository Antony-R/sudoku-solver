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

  constructor() { }

  ngOnInit(): void {
  }

  toggleNavbarColor(){
    if (!this.isNavbarAccent) 
      this.navbarColor = 'accent'
    else
      this.navbarColor = 'primary'
  }

}
