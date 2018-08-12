import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showSideNav = false;
  title = 'app';

  openSideNav() {
    this.showSideNav = !this.showSideNav;
  }
}
