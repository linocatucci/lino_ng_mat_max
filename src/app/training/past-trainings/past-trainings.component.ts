import { Subscription } from 'rxjs';
import { TrainingService } from './../training.service';
import { TrainingExercise } from './../training.exercise.model';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent
  implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<TrainingExercise>();
  subscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.subscription = this.trainingService.exerciseHistoryChanged.subscribe(
      (exercises: TrainingExercise[]) => {
        this.dataSource.data = exercises;
      }
    );
    // this.dataSource.data = this.trainingService.fetchAllFinishedOrCancelledExercises();
    this.trainingService.fetchAllFinishedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
