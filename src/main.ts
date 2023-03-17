import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Route } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/login/login.component';
import { SignUpComponent } from './app/sign-up/sign-up.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { ResetPasswordComponent } from './app/reset-password/reset-password.component';
import { CourseguardService } from './app/courseguard.service';
import { HomeComponent } from './app/home/home.component';
import { AuthServiceService } from './app/auth-service.service';
import { ForgetPasswordComponent } from './app/forget-password/forget-password.component';

import { ChangepasswordComponent } from './app/changepassword/changepassword.component';
import { CandeactivatecourseguardService } from './app/candeactivatecourseguard.service';
import { AuthguardService } from './app/authguard.service';
import { InterceptorService } from './app/interceptor.service';
import { NavComponent } from './app/nav/nav.component';
const routes:Route[]=[
  {path:'',redirectTo:'signup',pathMatch:'full'},
  {path:'login',component:LoginComponent,canActivate:[AuthguardService]},
  {path:'signup',component:SignUpComponent,canActivate:[AuthguardService]},
  {path:'home',component:HomeComponent,canActivate:[CourseguardService]},
  // {path:'login',component:LoginComponent},
  // {path:'signup',component:SignUpComponent},
  // {path:'home',component:HomeComponent},
  {path:'resetpassword',component:ResetPasswordComponent},
  {path:'forgetpassword',component:ForgetPasswordComponent},
  {path:'changepassword',component:ChangepasswordComponent},
  {path:'home1',component:NavComponent}
]


bootstrapApplication(AppComponent,{
  providers:[provideRouter(routes),
    AuthguardService,
    CandeactivatecourseguardService,
    CourseguardService,
    AuthServiceService,
    importProvidersFrom(HttpClientModule),
    {provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}
  ]
})
.catch(err => console.error(err));