import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from "@angular/common";
import { MatTableModule } from '@angular/material/table';
import { Workout } from '../workout';


@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
    MatTableModule
  ],
})

export class WorkoutListComponent implements OnInit {
  public workouts = ['All', 'Cycling', 'Walking', 'Running', 'Swimming', 'Yoga'];
  selectedType = "All";
  displayedColumns: string[] = ['name', 'type', 'minutes', 'symbol'];
  workoutList: Workout[] = [];
  sname = "";
  userWorkoutList: UserWorkoutElement[] = [];

  setData(): void {
    const isLocalPresent = localStorage.getItem("workout_data");
    if(isLocalPresent != null) {
      this.workoutList = JSON.parse(isLocalPresent);
      const groupedData = this.workoutList.reduce((acc, entry) => {
        const { name, type, minutes } = entry;
        const words = name.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        const uname = words.join(" ");
        if(uname.toLocaleUpperCase().includes(this.sname.toLocaleUpperCase())) {
          if (!acc[uname]) {
            acc[uname] = { uname, totalMinutes: 0, workouts: [], numberWorkouts: 0, workoutsString: "" };
          }
          if (this.selectedType === "All" || type === this.selectedType) {
            acc[uname].totalMinutes += minutes;
            acc[uname].numberWorkouts += 1;
            if (!acc[uname].workouts.includes(type)) {
              acc[uname].workouts.push(type);
              acc[uname].workoutsString = Array.from(acc[uname].workouts).join(', ')
            }
          }
        }
        return acc;
      }, {});

      const filteredData: UserWorkoutElement[] = Object.values(groupedData).filter((item: UserWorkoutElement) => item.totalMinutes > 0);

      this.userWorkoutList = filteredData
    }
  }

  ngOnInit(): void {
    this.setData();
  }

  ngDoCheck(): void {
    this.setData();
  }


}

export interface UserWorkoutElement {
  uname: string;
  totalMinutes: number;
  workouts: string[];
  numberWorkouts: number;
  workoutsString: string;
}
