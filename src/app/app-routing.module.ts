import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandeactivatecourseguardService } from './candeactivatecourseguard.service';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { CourseguardService } from './courseguard.service';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignUpComponent},
  {path:'resetpassword',component:ResetPasswordComponent},
  {path:'forgetpassword',component:ForgetPasswordComponent},
  {path:'changepassword',component:ChangepasswordComponent},
  {path:'home',component:HomeComponent,canDeactivate:[CandeactivatecourseguardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
