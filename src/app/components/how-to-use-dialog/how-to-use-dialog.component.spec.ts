import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToUseDialogComponent } from './how-to-use-dialog.component';

describe('HowToUseDialogComponent', () => {
  let component: HowToUseDialogComponent;
  let fixture: ComponentFixture<HowToUseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowToUseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToUseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
