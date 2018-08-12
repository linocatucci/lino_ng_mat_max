import { UIService } from './../shared/ui.service';
import { TrainingExercise } from './training.exercise.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '../../../node_modules/@angular/core';
import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TrainingService {
  private availableExercises: TrainingExercise[] = [
    // { id: 'Cycling', name: 'Cycling', duration: 30, calories: 8 },
    // { id: 'MTB', name: 'MTB', duration: 100, calories: 15 },
    // { id: 'Walking', name: 'Walking', duration: 200, calories: 18 },
    // { id: 'Kayaking', name: 'Kayaking', duration: 150, calories: 8 },
    // { id: 'Fly Fishing', name: 'Fly Fishing', duration: 300, calories: 8 }
  ];

  constructor(private db: AngularFirestore, private uiService: UIService) {}

  exerciseChanged = new Subject<TrainingExercise>();
  exercisesChanged = new Subject<TrainingExercise[]>();
  exerciseHistoryChanged = new Subject<TrainingExercise[]>();

  private runningExercise: TrainingExercise;
  // private exerciseHistory: TrainingExercise[] = [];
  firebaseSubscriptions: Subscription[] = [];

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.firebaseSubscriptions.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map(docArray => {
            // throw new Error();
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data().name,
                duration: doc.payload.doc.data().duration,
                calories: doc.payload.doc.data().calories
              };
            });
          })
        )
        .subscribe(
          (exercises: TrainingExercise[]) => {
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
            this.uiService.loadingStateChanged.next(false);
          },
          error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackbar(
              'Fetching exercises failed, please try again later',
              null,
              3000
            );
            this.exercisesChanged.next(null);
          }
        )
    );
  }

  startExercise(selectedId: string) {
    // if you need to update one specific document
    // this.db
    //   .doc('availableExercises/' + selectedId)
    //   .update({ lastSelected: new Date() });

    // find the exercise object the user selected in the array of exercises (mtb, cycling etc.)
    this.runningExercise = this.availableExercises.find(
      exercise => exercise.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
  }
  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
    console.log(this.fetchAllFinishedOrCancelledExercises());
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  cancelFireBaseSubs() {
    this.firebaseSubscriptions.forEach(subs => {
      subs.unsubscribe();
    });
  }

  fetchAllFinishedOrCancelledExercises() {
    // we don't need the id here so valueChanges is sufficient
    this.firebaseSubscriptions.push(
      this.db
        .collection('trainingExercises')
        .valueChanges()
        .subscribe((exercises: TrainingExercise[]) => {
          this.exerciseHistoryChanged.next(exercises);
        })
    );
  }

  private addDataToDatabase(exercise: TrainingExercise) {
    this.db.collection('trainingExercises').add(exercise);
  }
}
