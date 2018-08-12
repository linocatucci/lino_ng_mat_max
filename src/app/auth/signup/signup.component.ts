import { UIService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  isLoading = false;

  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnInit() {
    this.uiService.loadingStateChanged.subscribe(isloading => {
      this.isLoading = isloading;
    });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    console.log('submitted!', form);
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}
