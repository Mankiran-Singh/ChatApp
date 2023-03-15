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
import { HubConnectionState } from '@microsoft/signalr';
import { HomeComponent } from '../home/home.component';
import { map } from 'rxjs-compat/operator/map';
@Injectable()
@Component({
  selector: 'app-home1',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,SocialLoginModule,HomeComponent],
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css'],
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


export class Home1Component {

  msg: any;
  constructor(private activatedRoute:ActivatedRoute,private signalrService:SignalrService,private http:HttpClient,private deactivateGuard:CandeactivatecourseguardService,private router:Router,private courseguard:CourseguardService,private authservice:AuthServiceService){
   
  }
 
  users: Array<any> = new Array<any>();
  name:''
 
  selectedUser: User;
  onStatusChange(event:any) {
    console.log(event)
    this.name=event.index.firstName
  
  }

 
  ngOnInit(): void {
    this.userOnLis();
    this.userOffLis();
    this.logOutLis();
    this.getOnlineUsersLis();
    this.sendMsgLis();
    
 
  //   hubConnection.state is 1 when hub connection is connected.
  //  var hubConnection=this.signalrService.hubConnection.state
    if (HubConnectionState.Connected) this.getOnlineUsersInv();
    else {
      this.signalrService.ssSubj.subscribe((obj: any) => {
        if (obj.type == "HubConnStarted"){
          this.getOnlineUsersInv();
        }
      });
    }
  }
 
 


  logOut(): void {
    this.signalrService.hubConnection.invoke("logOut", this.signalrService.userData.id)
    .catch(err => console.error(err));
  }
  logOutLis(): void {
    this.signalrService.hubConnection.on("logoutResponse", () => {
      localStorage.removeItem("personId");
      location.reload();
      // this.signalrService.hubConnection.stop();
    });
  }

  userOnLis(): void {
    this.signalrService.hubConnection.on("userOn", (newUser: User) => {
      console.log(newUser);
      this.users.push(newUser);
    });
  }
  userOffLis(): void {
    this.signalrService.hubConnection.on("userOff", (personId: string) => {
      this.users = this.users.filter(u => u.id != personId);
    });
  }


  getOnlineUsersInv(): void {
    this.signalrService.hubConnection.invoke('OnlineUsers').catch(err => console.error(err));
  }
  private getOnlineUsersLis(): void {
    this.signalrService.hubConnection.on("OnlineUsers", (onlineUsers: Array<any>) => {
      this.users = [...onlineUsers];
      console.log(this.users);
    });
  }
  
   tokenValue=localStorage.getItem('token')
   httpOptions = { 
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
'Authorization': "bearer "+this.tokenValue})
};

 
  SendMessage(userId:string,msg:string){
   if (this.msg?.trim() === "" || this.msg == null) return;
    console.log(this.users)
    this.signalrService.hubConnection.invoke("SendMessage",this.users[0].userId,this.msg)
    .catch(err => console.error(err));

    if (this.users[0].msgs == null) this.users[0].msgs = [];
    this.users[0].msgs.push(new Message(this.msg, true));
    this.msg = "";
  }

  private sendMsgLis(): void {
    this.signalrService.hubConnection.on("sendMsgResponse", (connId: string, msg: string) => {
      let receiver = this.users.find(u => u.connId === connId);
      if (receiver.msgs == null) receiver.msgs = [];
      receiver.msgs.push(new Message(msg, false));
    });
  }
}
