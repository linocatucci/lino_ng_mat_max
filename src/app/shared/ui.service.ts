import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '../../../node_modules/@angular/core';

/*
Wanneer de register user and login user wordt aangeroepen en deze is nog niet voltooid dan moet er een spinner getoond worden
wanneer de spinner getoond wordt moet de butoon niet getoond worden
bij error moet de spinner ook  getoond worden


1. maak een subject aan die wanneer aangeroepen wordt een boolean (true) stuurt
2. in de 

*/
// loadingStateChanged
@Injectable()
export class UIService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private matSnackbar: MatSnackBar) {}

  showSnackbar(error, action, duration) {
    this.matSnackbar.open(error, null, { duration: duration });
  }
}
