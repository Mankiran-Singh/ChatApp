import { Component, OnInit, ViewChild ,ElementRef, AfterViewInit, Injectable, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { CourseguardService } from '../courseguard.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SocialAuthServiceConfig, SocialLoginModule,SocialAuthService} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import {CandeactivatecourseguardService, IDeactivateComponent } from '../candeactivatecourseguard.service';
import { debounceTime, distinct, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message, SignalrService, User } from '../signalr.service';
import { SendMessageComponent } from '../send-message/send-message.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SocialLoginModule,RouterModule],
    providers: [AuthServiceService, CourseguardService, SocialAuthService, CandeactivatecourseguardService, 
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider('750300741709-ir60qvj3lmadj40k36gkvmdddot0968c.apps.googleusercontent.com')
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
})
export class NavComponent {

  @Input() currentUser :string ='';
  constructor(private service :AuthServiceService,private route : Router){}
  ChangePass()
  {
      this.route.navigateByUrl('/change_Password');
  }

  logout()
  {
      this.service.logout().subscribe((response)=>{
          console.log(response);
      })
      this.route.navigateByUrl("/login");
      this.service.SignOut()
  }

}
