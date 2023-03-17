import { Component,EventEmitter,Injectable} from '@angular/core';
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
import {CandeactivatecourseguardService} from '../candeactivatecourseguard.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message, SignalrService, User } from '../signalr.service';
import { HubConnectionState} from '@microsoft/signalr';
import { HomeComponent } from '../home/home.component';
import { map } from 'rxjs-compat/operator/map';
import { Subject } from 'rxjs';
@Injectable()
@Component({
  selector: 'app-home1',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,SocialLoginModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  providers:[SignalrService,AuthServiceService,CourseguardService,SocialAuthService,CandeactivatecourseguardService
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


export class MessageComponent
{
 
  showMessage :boolean = false;
  signaldata : any[] =[];
  xyz : string ='';
    constructor(private service : SignalrService){}
  ngOnInit(): void {
    // this.service._hubConnection?.on( this.xyz,(message: any)=>{
    //   this.signaldata.push(message);
    //   this.showMessage=true;
    // })
  }

  showmessage()
  {
    this.showMessage = false;
  }
}
