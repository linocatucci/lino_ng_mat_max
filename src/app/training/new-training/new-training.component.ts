import { TrainingService } from './../training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingExercise } from '../training.exercise.model';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  availableExercises: TrainingExercise[];
  // availableExercises: Observable<TrainingExercise>;
  exerciseSubscription: Subscription;
  loadingSubscription: Subscription;
  isLoading = true;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => {
        this.availableExercises = exercises;
      }
    );
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      isloading => {
        this.isLoading = isloading;
      }
    );
    this.fetchExercises();
  }

  onNewTrainingStarted(form: NgForm) {
    // send the id from the form of the exercice to the service
    this.trainingService.startExercise(form.value.workout);
    console.log('on training start werkt!!', form.value.workout);
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
