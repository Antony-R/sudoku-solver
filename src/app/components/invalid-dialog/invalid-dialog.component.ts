import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-invalid-dialog',
  templateUrl: './invalid-dialog.component.html',
  styleUrls: ['./invalid-dialog.component.css']
})
export class InvalidDialogComponent implements OnInit {

  static errorMsg: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  get ErrorMsg(){
    return InvalidDialogComponent.errorMsg
  }

}
