import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true,
  imports: [FormComponent],
})

export class HomeComponent {}