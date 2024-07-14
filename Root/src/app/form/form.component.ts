import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from "@angular/common";
import { Workout } from '../workout';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    CommonModule
  ],
})

export class FormComponent implements OnInit {
  public workouts = ['Cycling', 'Walking', 'Running', 'Swimming', 'Yoga'];
  workoutModel: Workout = new Workout();
  workoutList: Workout[] = [];

  ngOnInit(): void {
    const isLocalPresent = localStorage.getItem("workout_data");
    if(isLocalPresent != null) {
      this.workoutList = JSON.parse(isLocalPresent);
    }
  }

  saveWorkout(form: NgForm) {
    const isLocalPresent = localStorage.getItem("workout_data");
    if(isLocalPresent != null) {
      const oldArray = JSON.parse(isLocalPresent);
      this.workoutModel.id = oldArray.length + 1;
      oldArray.push(this.workoutModel);
      localStorage.setItem("workout_data", JSON.stringify(oldArray));
    } else {
      const newArray = [];
      this.workoutModel.id = 1;
      newArray.push(this.workoutModel);
      localStorage.setItem("workout_data", JSON.stringify(newArray));
    }
    form.resetForm();
  }

}
