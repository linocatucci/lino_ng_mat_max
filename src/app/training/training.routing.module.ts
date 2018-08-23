import { AuthGuard } from './../auth/auth.guard.service';
import { TrainingComponent } from './training.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const trainingRoutes: Routes = [
  {
    path: 'training',
    component: TrainingComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(trainingRoutes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule {}
