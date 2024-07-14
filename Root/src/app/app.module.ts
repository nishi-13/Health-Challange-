import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { WorkoutListComponent } from './workout-list/workout-list.component';


@NgModule({
  declarations: [
    AppComponent,
    WorkoutListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeComponent
  ],
  providers: [provideAnimations(), {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  bootstrap: [AppComponent]
})
export class AppModule {}
