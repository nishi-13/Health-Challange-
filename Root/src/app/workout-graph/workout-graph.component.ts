import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {MatListModule} from '@angular/material/list';
import { Workout } from '../workout';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-workout-graph',
  templateUrl: './workout-graph.component.html',
  styleUrl: './workout-graph.component.css',
  standalone: true,
  imports: [
	MatListModule,
	CommonModule, 
	CanvasJSAngularChartsModule,
	MatChipsModule
  ],
})

export class WorkoutGraphComponent {
	
	username = "";
	dataPoints = [];
	users: string[] = []

	chartOptions = {}

	@Input() workoutList: Workout[] = [];

	getUser(): void {
		const names = this.workoutList.map(item => item.name);
		const uniqueNamesSet = new Set(names);
		this.users = Array.from(uniqueNamesSet);
	}

	setUser(username: string) {
		this.username = username;
	}

	ngOnInit(): void {
		this.getUser();
		this.username = this.users[0];
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.getUser();
	}

	ngDoCheck(): void {

		const totalMinutesByType = this.workoutList
		.filter(item => item.name === this.username)
		.reduce((acc, curr) => {
			if (!acc[curr.type]) {
			acc[curr.type] = 0;
			}
			acc[curr.type] += curr.minutes;
			return acc;
		}, {});

		const result = Object.keys(totalMinutesByType).map(type => ({
			label: type,
			y: totalMinutesByType[type]
		}));

		console.log(result);

		this.chartOptions = {
			title: {
				text: this.username + "'s workout progress" 
			},
			animationEnabled: true,
			axisY: {
				includeZero: true
			},
			data: [{
				type: "column", 
				dataPoints: result
			}]
		}
	}
		
}
