import { UIService } from './../shared/ui.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';

@Injectable()
export class AuthService {
  // private user: User;
  isAuthenticated = false;
  authChanged = new Subject<boolean>();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackBar: MatSnackBar,
    private uiService: UIService,
    private store: Store<{ ui: fromApp.State }>
  ) {}

  registerUser(authData: AuthData) {
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // };
    // this is a promise!
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({ type: 'START_LOADING' });
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({ type: 'STOP_LOADING' });
        this.authSuccess();
      })
      .catch(error => {
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({ type: 'STOP_LOADING' });
        // this.snackBar.open(error.message, null, { duration: 3000 });
        this.uiService.showSnackbar(error, null, 3000);
      });
  }

  login(authData: AuthData) {
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // };
    // this is a promise!
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({ type: 'START_LOADING' });
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({ type: 'STOP_LOADING' });
        this.authSuccess();
      })
      .catch(error => {
        console.log(error);
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch({ type: 'STOP_LOADING' });
        // this.snackBar.open(error.message, null, { duration: 3000 });
        this.uiService.showSnackbar(error, null, 3000);
        this.router.navigate(['/signup']);
      });
  }

  logout() {
    this.trainingService.cancelFireBaseSubs();
    this.afAuth.auth.signOut();
    this.authChanged.next(false);
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
  }

  // this will return true or false, true if the user is authenticated.
  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccess() {
    this.isAuthenticated = true;
    this.authChanged.next(true);
    this.router.navigate(['/training']);
  }
}
