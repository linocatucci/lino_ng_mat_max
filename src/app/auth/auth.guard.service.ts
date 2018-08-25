import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  canLoad() {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
