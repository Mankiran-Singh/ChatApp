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
import { SignalrService} from '../signalr.service';
import { NavComponent } from '../navbar/navbar.component';
import { SendMessageComponent } from '../send-message/send-message.component';
import { urlImage } from 'src/constant';
@Injectable()
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SocialLoginModule,NavComponent, RouterModule, SendMessageComponent],
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


export class HomeComponent implements OnInit{

    msg:any ='';
    IdChat :string = ''
    pageNumber:Number=1;
    urlImage=urlImage
    
    ngOnDestroy(): void {
      this.chatService._hubConnection?.off("recieveMessage")
    }

    onlineUsers :Array<any> =[]
    selectedUserdata :any=[]
    userArray :any=[];
    showUser : boolean = false;
    currentUserName: string ='';
    currentUserEmail : string ='';
    url=''
    @ViewChild('msgBox') msgBox:any;
    constructor(private route: Router , 
        private service :AuthServiceService , 
        private chatService : SignalrService,
        private activatedroute:ActivatedRoute){
        const curr =  this.route.getCurrentNavigation();
        const state = curr?.extras.state as {
         'name' : string,
         'email' :string,
         'token' :string,
        }
        state.token;
        this.currentUserName= state.name;
        this.currentUserEmail = state.email;
        this.chatService.startConnection(localStorage.getItem('token'));
        this.chatService.onlineUsers.subscribe((response :any)=>{
            this.onlineUsers = response;
           
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
            })
        }        
           this.service.userGet().subscribe((response)=>{
            
           });

        this.showUser=true;
    }
  
    ngOnInit(): void { 
    }
    getMessage(event:any)
    {
        this.selectedUserdata= event
        //console.log(this.selectedUserdata)
        this.chatService.addChat(this.selectedUserdata['email']).then((response: any)=>{
          this.IdChat= response;
        //    this.pageNumber=response;
          this.chatService.getChat(response,this.pageNumber);
            this.chatService.chatSubject.subscribe((response=>{
            this.msg = response;
            //this.service.raiseDataEmitter()
            }))
        })
        this.userArray.length=0;
        this.service.raiseDataEmitter()
    }
    
    usersData:any=[]
    getProfile(){
        this.route.navigate(['profile'])
    }

}
