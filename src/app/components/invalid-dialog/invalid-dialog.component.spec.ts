import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidDialogComponent } from './invalid-dialog.component';

describe('InvalidDialogComponent', () => {
  let component: InvalidDialogComponent;
  let fixture: ComponentFixture<InvalidDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalidDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
