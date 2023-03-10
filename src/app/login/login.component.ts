import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup,FormControl,FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';
import { CourseguardService } from '../courseguard.service';
import { AuthServiceService } from '../auth-service.service';
import { SocialAuthServiceConfig, SocialLoginModule,SocialAuthService} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule,SocialLoginModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[CourseguardService,AuthServiceService,SocialAuthService,
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
    }]
})
export class LoginComponent {
  constructor(private authservice:AuthServiceService,private authService:SocialAuthService,private courseguard:CourseguardService,private router:Router,private activatedRoute:ActivatedRoute){
    
  }
  form: any = {
    email: null,
    password: null,
  };
  loginForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(5)]),
  })
  loginUser(){
    const {email, password} = this.loginForm.value
    console.log(this.loginForm.value);
  
    this.authservice.login(email,password).subscribe(
      (res:any)=>{
        console.log(res)
        this.loginForm.reset();
        this.authservice.storeToken(res.data);
          this.router.navigate(['home']);
      }
    );
  }
  forgetPassword(){
    this.router.navigate(['forgetpassword'])
  }

  visible:boolean = true;
  changetype:boolean =true;

  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
  

  user:any;
  loggedIn:any;
 ngOnInit() {
   this.authService.authState.subscribe((user) => {
     this.user = user;
     this.loggedIn = (user != null);
     console.log(this.user)
   });
 }

 signInWithFB(): void {
   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
 }

 signOut(): void {
   this.authService.signOut();
 }

 get email(){
  return this.loginForm.get('email')
}

get password(){
  return this.loginForm.get('password')
}
}
