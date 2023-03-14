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
import { Home1Component } from "../home1/home1.component";
@Injectable()
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
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
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SocialLoginModule, Home1Component,RouterModule]
})


export class HomeComponent implements AfterViewInit,IDeactivateComponent{

  constructor(private signalrService:SignalrService,private http:HttpClient,private deactivateGuard:CandeactivatecourseguardService,private router:Router,private courseguard:CourseguardService,private authservice:AuthServiceService){}

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

 canExit(){
  if(this.firstName || this.lastName || this.country || this.subject){
   return confirm('You have unsaved changes. Do you really want to discard changes')
  }else{
    return true;
  }
 }
 requestedData:any
 @ViewChild('myInput') myInput:any
 ngAfterViewInit(): void {
  const searchTerm = fromEvent<any>(this.myInput.nativeElement, 'keyup')
   searchTerm.pipe(map(event=>event.target.value)).subscribe((res)=>{
    debounceTime(5000)
    distinctUntilChanged()
    this.authservice.getDataSearch(res).subscribe((data:any)=>{
      console.log(data)
     this.requestedData=data.data
    })
    setTimeout(()=>{
      this.requestedData=null
    },5000)
   })
 }
 @Input() data:Array<User>=[]
  @Output()statusChanged : EventEmitter<{index:number,value:string}>=new EventEmitter<{index:number,value:string}>()
  onChange(index:number,value:any){
        this.statusChanged.emit({index:index,value:value.target.value});
        this.router.navigate(['home1']);
  }

  gotohome(){
    this.router.navigate(['home1'])
  }
}
