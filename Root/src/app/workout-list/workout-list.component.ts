import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from "@angular/common";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserWorkoutElement } from '../workout';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
})

export class WorkoutListComponent {
  public workouts = ['All', 'Cycling', 'Walking', 'Running', 'Swimming', 'Yoga'];
  displayedColumns: string[] = ['name', 'type', 'minutes', 'symbol'];
  
  @Input() dataSource: UserWorkoutElement[] = [];
  @Input() userWorkoutList: UserWorkoutElement[] = [];
  sname: string = "";
  selectedType: string = "All";

  pageSize: number = 5;
  currentPage: number = 0;

  ngOnInit(): void {
    this.paginateData();
  }

  ngOnChanges(): void {
    this.paginateData();
  }

  paginateData() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource = this.userWorkoutList.slice(startIndex, endIndex);
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateData();
  }

  @Output() snameChange: EventEmitter<string> = new EventEmitter<string>();

  onNameChange(event: any) {
    this.snameChange.emit(this.sname);
  } 
   
  @Output() typeChange: EventEmitter<string> = new EventEmitter<string>();

  onTypeChange(event: any) {
    console.log(this.selectedType);
    this.typeChange.emit(this.selectedType);
  }

}
