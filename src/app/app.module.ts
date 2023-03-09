import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import {FormControl,FormGroup,Validators,FormsModule,ReactiveFormsModule} from '@angular/forms'
import { CourseguardService } from './courseguard.service';
import { AuthServiceService } from './auth-service.service';
import { SocialLoginModule, SocialAuthServiceConfig, SocialAuthService } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    SignUpComponent,
    LoginComponent,
    FormsModule,
    ReactiveFormsModule,
    AppComponent,
    SocialLoginModule
  ],
  providers:[CourseguardService,AuthServiceService,SocialAuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '750300741709-ir60qvj3lmadj40k36gkvmdddot0968c.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('153159880945029')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }],
  bootstrap: []
})
export class AppModule { 
  constructor(private authService:SocialAuthService,private authservice:AuthServiceService,private coursegurad:CourseguardService,private router:Router,private http:HttpClient){

  }
}
