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


export class HomeComponent implements OnInit,AfterViewInit{

  constructor(private activatedRoute:ActivatedRoute,private signalrService:SignalrService,private http:HttpClient,private deactivateGuard:CandeactivatecourseguardService,private router:Router,private courseguard:CourseguardService,private authservice:AuthServiceService){
    this.signalrService.startConnection(localStorage.getItem('token'))
  }
  ngOnInit(): void {
    
  }

logout(){
  this.authservice.logOut()
}
changePassword(){
  this.router.navigateByUrl("changepassword")
}


 @Input() requestedData:Array<any>=[]
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

 @Output()statusChanged : EventEmitter<{index:any,value:string}>=new EventEmitter<{index:any,value:string}>()
  onChange(index:any,value:any){
    console.log(index)
    console.log(index.firstName)
        this.statusChanged.emit({index:index,value:value.target.value});
        this.router.navigate(['home1'])
  }

  gotohome(){
    this.router.navigate(['home1'])
  }
}
