import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { CourseguardService } from '../courseguard.service';
import { Router } from '@angular/router';
import { SocialAuthServiceConfig, SocialLoginModule,SocialAuthService} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,SocialLoginModule],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  providers:[AuthServiceService,CourseguardService,SocialAuthService,
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
    }
  ]
})
export class ErrorComponent {

}
