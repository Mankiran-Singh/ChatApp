import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { CourseguardService } from '../courseguard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthServiceConfig, SocialLoginModule,SocialAuthService} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { CandeactivatecourseguardService, IDeactivateComponent } from '../candeactivatecourseguard.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,SocialLoginModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[AuthServiceService,CourseguardService,SocialAuthService,CandeactivatecourseguardService
    ,{
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
    }]
})
export class HomeComponent implements OnInit,IDeactivateComponent{

  constructor(private deactivateGuard:CandeactivatecourseguardService,private router:Router,private courseguard:CourseguardService,private authservice:AuthServiceService){

  }
logout(){
  this.authservice.logOut()
}
changePassword(){
  this.router.navigateByUrl("changepassword")
}

firstName: any;
lastName: any;
country: any;
subject: any;

ngOnInit(): void {
 
}
 canExit(){
  if(this.firstName || this.lastName || this.country || this.subject){
   return confirm('You have unsaved changes. Do you really want to discard changes')
  }else{
    return true;
  }
 }
}
