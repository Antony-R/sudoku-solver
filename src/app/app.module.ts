import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { SolverComponent } from './components/solver/solver.component';
import { SolverService } from './services/solver.service';
import { PuzzleSolvedDialogComponent } from './components/puzzle-solved-dialog/puzzle-solved-dialog.component';
import { InvalidDialogComponent } from './components/invalid-dialog/invalid-dialog.component';
import { HowToUseDialogComponent } from './components/how-to-use-dialog/how-to-use-dialog.component';

const routes: Routes = [
  {path: '', component: HomeComponent}
] 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SolverComponent,
    PuzzleSolvedDialogComponent,
    InvalidDialogComponent,
    HowToUseDialogComponent
  ],
  entryComponents: [PuzzleSolvedDialogComponent, InvalidDialogComponent, HowToUseDialogComponent],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSliderModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [SolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
