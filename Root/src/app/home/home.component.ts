import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { WorkoutListComponent } from '../workout-list/workout-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [
    FormComponent,
    WorkoutListComponent
  ],
})

export class HomeComponent {}