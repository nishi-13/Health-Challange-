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
    } else {
      const newArray = [];
      localStorage.setItem("workout_data", JSON.stringify(newArray));
      newArray.push({id: 1, name: "Nishi", minutes: 20, type: "Walking"});
      newArray.push({id: 2, name: "Nishi", minutes: 10, type: "Running"});
      newArray.push({id: 3, name: "Harshit", minutes: 20, type: "Running"});
      newArray.push({id: 4, name: "Gourav", minutes: 45, type: "Swimming"});
      newArray.push({id: 5, name: "Gourav", minutes: 30, type: "Walking"});
      newArray.push({id: 6, name: "Nishi", minutes: 20, type: "Yoga"});
      localStorage.setItem("workout_data", JSON.stringify(newArray));
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
