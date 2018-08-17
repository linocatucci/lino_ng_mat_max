import { AuthService } from './../../auth/auth.service';
import { Subject } from 'rxjs/Subject';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output()
  closeSideNav = new EventEmitter<void>();
  authSubscription: Subscription;
  isAuth = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authChanged.subscribe(
      authStatus => {
        this.isAuth = authStatus;
      }
    );
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onClose() {
    this.closeSideNav.emit();
  }

  onLogout() {
    this.authService.logout();
    this.onClose();
  }
}
