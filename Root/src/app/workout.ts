export class Workout {
    
    public id?: number;
    public name?: string;
    public minutes?: number;
    public type?: 'Cycling' | 'Walking' | 'Running' | 'Swimming' | 'Yoga';

    constructor() {};

}

export interface UserWorkoutElement {
    uname: string;
    totalMinutes: number;
    workouts: string[];
    numberWorkouts: number;
    workoutsString: string;
}
  