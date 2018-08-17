import { SharedModule } from './../shared/shared.module';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [AngularFireAuthModule, SharedModule]
})
export class AuthModule {}
