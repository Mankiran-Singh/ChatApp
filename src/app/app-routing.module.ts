import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './authguard.service';
import { CandeactivatecourseguardService } from './candeactivatecourseguard.service';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { CourseguardService } from './courseguard.service';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  {path:'login',component:LoginComponent,canActivate:[AuthguardService]},
  {path:'signup',component:SignUpComponent,canActivate:[AuthguardService]},
  {path:'resetpassword',component:ResetPasswordComponent},
  {path:'forgetpassword',component:ForgetPasswordComponent},
  {path:'changepassword',component:ChangepasswordComponent},
  {path:'home',component:HomeComponent,canActivate:[CourseguardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
