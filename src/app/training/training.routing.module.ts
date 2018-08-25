
import { TrainingComponent } from './training.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const trainingRoutes: Routes = [
  {
    path: '',
    component: TrainingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(trainingRoutes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule {}
