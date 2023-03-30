import { Component, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
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
import { Subscriber } from 'rxjs';
import { environment } from 'src/environment';
import { Observable } from 'rxjs';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SafePipe, SafePipeModule } from 'safe-pipe';
import { text,image,filetype } from 'src/constant';
import { urlChooseFile } from 'src/constant';
import { MatIconModule } from '@angular/material/icon';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
@Injectable()

@Component({
    selector: 'app-send-message ',
    standalone: true,
    templateUrl: './send-message.component.html',
    styleUrls: ['./send-message.component.css'],
    imports: [CommonModule, FormsModule, SocialLoginModule,RouterModule ,SafePipeModule,InfiniteScrollModule,MatIconModule,PickerModule],
    providers: [AuthServiceService,CourseguardService, SocialAuthService, CandeactivatecourseguardService,SafePipe,
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
 

export class SendMessageComponent{
  toastermsg : boolean = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set:any='twitter'
  @Input() messageArray :any =[]
  @Input() chatId:string='';
  @Input() pageNumber:number=1;
  urlChooseFile=urlChooseFile
  image=image
  text=text
  files=filetype
  responseArray :any = []
  userCheck: boolean = false;
  message : string ='';
  name : string =''
  msg=1 || 2 || 3;
  @ViewChild('msgBox') msgBox:any;
  constructor(private service :SignalrService ,
     private registerService :AuthServiceService)
     {
       this.recieveMsg()
       this.scrollDown() 
     }
  
  @Input() data :any | undefined ;
  @Input() currentUser ?:string
 
  scrollDown(){
    setTimeout(()=>{
      this.msgBox.nativeElement.scrollTop
      =this.msgBox.nativeElement.scrollHeight;
    },1000)
  }

  sendMsg()
  {
      {
          this.service.sendMessage(this.data['email'],this.message,1,"abc","");
          this.service.getChat(this.chatId,1);
          this.service.chatSubject.subscribe((res:any)=>{
              this.messageArray.push(res);
              })
              this.message='';
              this.scrollDown();
      }
      this.recieveMsg()
}

recieveMsg()
{
 this.service.receiveMessageListener();
 this.service.Message.subscribe((response :any)=>{
  if(response.userEmail == this.data['email'])
  {
      this.service.getChat(this.chatId,this.pageNumber)
      this.service.chatSubject.subscribe((response=>{
      this.messageArray = response;
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
  }

 })
}
type:any=1
file:any
getFile(event:any){
  this.file=event.target.files[0]
}

fileUpload: any;
uploadImage(filepath:any){
  this.fileUpload=filepath;
  //console.log(this.fileUpload)
  let dataimage=''
  this.convertBase64(this.fileUpload)
  let formdata=new FormData()
  formdata.append('file',this.fileUpload)
  this.registerService.fileupload(formdata,2,this.currentUser).subscribe((res:any)=>{
    dataimage=environment.url+res.data['filePath']
    this.service.sendMessage(this.data['email'],this.message,2,dataimage,res.data.fileName)
    setTimeout(()=>{
      this.msgBox.nativeElement.scrollTop
      =this.msgBox.nativeElement.scrollHeight;
    },2000)
    this.service.getChat(this.chatId,this.pageNumber);
    this.service.chatSubject.subscribe((response:any)=>{
      this.messageArray=response
    })
  })
  this.message=''
}

uploadFile(filepath:any){
  console.log(filepath.name)
  this.fileUpload=filepath;
  let datafile=''
    let formdata=new FormData()
     formdata.append('file',this.fileUpload)
    this.registerService.fileupload(formdata,3,this.currentUser).subscribe((res:any)=>{
    
      datafile=environment.url+res.data['filePath']
      this.service.sendMessage(this.data['email'],this.message,3,datafile,res.data.fileName)

      this.service.getChat(this.chatId,this.pageNumber);
      this.service.chatSubject.subscribe((response:any)=>{
        this.messageArray=response
      })
    })
    this.message=''
}


myImage:any
base64Code:any
convertBase64(file:File){
   const observable=new Observable((subscriber:Subscriber<any>)=>{
     this.readFile(file,subscriber)
   })
   observable.subscribe((res)=>{
   // console.log("=====>image ===>",res)
    this.myImage=res.target.result
    this.base64Code=res
   })
}

readFile(file:File,subscriber:Subscriber<any>){
  const filereader=new FileReader();
  filereader.readAsDataURL(file)
  filereader.onload=()=>{
    subscriber.next(filereader.result)
    subscriber.complete()
  }
  filereader.onerror=()=>{
    subscriber.error();
    subscriber.complete();
  }
}
 onScroll(){
  const length=this.messageArray.length
  setTimeout(()=>{
    const p:any=''.repeat(10).split('').map((s,i)=>i+1)
      while(p.length) this.messageArray.push(p.shift())
  },1000)
 }
 showEmojiPicker = false;
 toggleEmojiPicker() {
  console.log(this.showEmojiPicker);
      this.showEmojiPicker = !this.showEmojiPicker;
}

addEmoji(event) {
  console.log(this.message)
  const { message } = this;
  console.log(message);
  console.log(`${event.emoji.native}`)
  const text = `${message}${event.emoji.native}`;

  this.message = text;
}


onFocus() {
  console.log('focus');
  this.showEmojiPicker = false;
}
onBlur() {
  console.log('onblur')
}
}
