import { TrainingService } from './training.service';
import { TrainingExercise } from './training.exercise.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  newTrainingStarted = false;
  subscription: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.subscription = this.trainingService.exerciseChanged.subscribe(
      exercise => {
        if (exercise) {
          this.newTrainingStarted = true;
        } else {
          this.newTrainingStarted = false;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onTrainingStarted() {
    this.newTrainingStarted = !this.newTrainingStarted;
  }
}
