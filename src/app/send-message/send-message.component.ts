import { Component, OnInit, ViewChild ,ElementRef, AfterViewInit, Injectable, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { CourseguardService } from '../courseguard.service';
import { RouterModule } from '@angular/router';
import { SocialAuthServiceConfig, SocialLoginModule,SocialAuthService} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import {CandeactivatecourseguardService,} from '../candeactivatecourseguard.service';
import {SignalrService } from '../signalr.service';
import { HomeComponent } from '../home/home.component';
@Injectable()
@Component({
    selector: 'app-send-message ',
    standalone: true,
    templateUrl: './send-message.component.html',
    styleUrls: ['./send-message.component.css'],
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

export class SendMessageComponent {
  toastermsg : boolean = false;
  @Input() msgArray :any =[]
  @Input() chatId:string='';
  responseArray :any = []
  userCheck: boolean = false;
  message : string ='';
  name : string =''
  constructor(private service :SignalrService , private registerService :AuthServiceService){
  
    this.recieveMsg();
  }
  @Input() data :any | undefined ;
  @Input() currentUser ?:string
  sendMsg()
  {
      if(this.message != null)
      {
          this.service.sendMessage(this.data['email'],this.message);
          this.service.getChat(this.chatId);
          this.service.chatSubject.subscribe((response=>{
              this.msgArray = response;
              }))

              this.message='';
          
      }
  this.recieveMsg()
}

playAudio(){
  let audio = new Audio();
  audio.src = "../assets/VyaparApp__GDPREM_installer.exe";
  audio.load();
  audio.play();
}
recieveMsg()
{
 this.service.receiveMessageListener();
 this.service.Message.subscribe((response :any)=>{
  if(response.userEmail == this.data['email'])
  {
      this.service.getChat(this.chatId)
      this.service.chatSubject.subscribe((response=>{
      this.msgArray = response;
      this.playAudio()
  }));
}

  else
  {
      let arr = []
    let div= document.getElementsByClassName('toast')[0];
    div.classList.add('show');
    this.registerService.userGet().subscribe((res:any)=>{
      arr = res['data'];
     let arr2 = arr.find( ( array: any)  =>  {  return (array.email===response.userEmail)})

     this.name = arr2['firstName'];
     });
     this.playAudio();
  }

 })
}

}
