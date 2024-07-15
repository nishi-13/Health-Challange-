import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { WorkoutListComponent } from '../workout-list/workout-list.component';
import { Workout, UserWorkoutElement } from '../workout';
import { WorkoutGraphComponent } from '../workout-graph/workout-graph.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [
    FormComponent,
    WorkoutListComponent,
    WorkoutGraphComponent
  ],
})

export class HomeComponent {  

  dataSource: UserWorkoutElement[] = [];
  userWorkoutList: UserWorkoutElement[] = [];
  workoutList: Workout[] = [];
  selectedType = "All";
  sname = "";

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

  ngOnInit(): void {
    this.setData();
  }

  ngDoCheck(): void {
    this.setData();
  }

  changeName(name: any) {
    this.sname = name;
  }

  changeType(type: any) {
    this.selectedType = type;
  }

}
