import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleSolvedDialogComponent } from './puzzle-solved-dialog.component';

describe('PuzzleSolvedDialogComponent', () => {
  let component: PuzzleSolvedDialogComponent;
  let fixture: ComponentFixture<PuzzleSolvedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleSolvedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleSolvedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
