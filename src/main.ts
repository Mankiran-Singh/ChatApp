import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Route } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { SignUpComponent } from './app/sign-up/sign-up.component';
import {HttpClientModule} from '@angular/common/http'
import { ResetPasswordComponent } from './app/reset-password/reset-password.component';
import { CourseguardService } from './app/courseguard.service';
import { HomeComponent } from './app/home/home.component';
import { AuthServiceService } from './app/auth-service.service';
import { ForgetPasswordComponent } from './app/forget-password/forget-password.component';

import { ChangepasswordComponent } from './app/changepassword/changepassword.component';
import { CandeactivatecourseguardService } from './app/candeactivatecourseguard.service';
const routes:Route[]=[
  {path:'',redirectTo:'signup',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignUpComponent},
  {path:'home',component:HomeComponent,canDeactivate:[CandeactivatecourseguardService]},
  {path:'resetpassword',component:ResetPasswordComponent},
  {path:'forgetpassword',component:ForgetPasswordComponent},

  {path:'changepassword',component:ChangepasswordComponent}
]

bootstrapApplication(AppComponent,{
  providers:[provideRouter(routes),CandeactivatecourseguardService,CourseguardService,AuthServiceService,importProvidersFrom(HttpClientModule)]
})
.catch(err => console.error(err));