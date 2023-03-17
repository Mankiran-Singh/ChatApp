import { Component, OnInit, ViewChild ,ElementRef, AfterViewInit, Injectable, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { CourseguardService } from '../courseguard.service';
import {  Router, RouterModule } from '@angular/router';
import { SocialAuthServiceConfig, SocialLoginModule,SocialAuthService} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import {CandeactivatecourseguardService} from '../candeactivatecourseguard.service';

import {SignalrService} from '../signalr.service';
import { NavComponent } from '../nav/nav.component';
import { SendMessageComponent } from '../send-message/send-message.component';
@Injectable()
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SocialLoginModule, NavComponent, RouterModule, SendMessageComponent],
    providers: [AuthServiceService, CourseguardService, SocialAuthService, CandeactivatecourseguardService, SendMessageComponent,
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


export class HomeComponent implements OnInit,OnDestroy{
    msgArray :any ='';
    chatId :string = ''
    ngOnInit(): void {
    }
    
    ngOnDestroy(): void {
      this.chatService._hubConnection?.off("recieveMessage")
    }

    onlineUsers :Array<any> =[]
    selectedUserdata :any=[]
    userArray :any=[];
    showUser : boolean = false;
    currentUserName: string ='';
    currentUserEmail : string ='';
    constructor(private route: Router , private service :AuthServiceService , private chatService : SignalrService){
        const curr =  this.route.getCurrentNavigation();
        const state = curr?.extras.state as {
         'name' : string,
         'email' :string,
         'token' :string,
        }
 
        this.currentUserName= state.name;
        this.currentUserEmail = state.email;

        this.chatService.startConnection(state.token);
        this.chatService.onlineUsers.subscribe((response :any)=>{
            this.onlineUsers = response;
            console.log(this.onlineUsers);
        })
    }

    getUser(event:any)
    {   
        const val = event.target.value;
        if(val.length != null)
        {
            this.service.usergetMatch(val).subscribe((response :any)=>{
                const obj= response['data'];
                this.userArray = obj;
                console.log(this.userArray)
            })
        }        
           this.service.userGet().subscribe((response)=>{
            console.log(response);
           });

        this.showUser=true;
    }


    getUserMessage(event:any)
    {
        this.selectedUserdata= event

        console.log(this.selectedUserdata)
        this.chatService.addChat(this.selectedUserdata['email']).then((response: any)=>{
          this.chatId= response;

          this.chatService.getChat(response);
            this.chatService.chatSubject.subscribe((response=>{
            this.msgArray = response;
            }))
        })
        this.userArray.length=0;
    }
}
