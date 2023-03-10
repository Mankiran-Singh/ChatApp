import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { CourseguardService } from '../courseguard.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SocialAuthServiceConfig, SocialLoginModule,SocialAuthService} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { Token } from '@angular/compiler';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,SocialLoginModule,RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers:[AuthServiceService,CourseguardService,SocialAuthService,
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
    }
  ]
})
export class ResetPasswordComponent implements OnInit
{
  form: any = {
    email:null,
    newpassword: null,
    confirmpassword: null,
  };
  constructor(private activatedRoute:ActivatedRoute,private authService:SocialAuthService,private authservice:AuthServiceService,private courseGuard:CourseguardService,private router:Router){}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((res:any)=>{
      this.authservice.storeToken(res['token'])
      console.log(res['token']);
    })
  }
  resetForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    newPassword:new FormControl('',[Validators.required,Validators.minLength(5)]),
    confirmPassword:new FormControl('',[Validators.required,Validators.minLength(5)])
  })
  ResetPassword(){
    // if(this.resetForm.valid){
      const {newPassword, confirmPassword} = this.resetForm.value
      this.authservice.resetPassword(newPassword,confirmPassword).subscribe(
        (res:any)=>{
          console.log(res)
          this.resetForm.reset();
          //this.authservice.storeVerifyToken(res.data.token)
          this.router.navigate(['login']);
        }
      );
    
  }
  
  visible:boolean = true;
  changetype:boolean =true;

  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  get newPassword()
  {
    return this.resetForm.get('newPassword')
  }
  get confirmPassword()
  {
    return this.resetForm.get('confirmPassword')
  }
  get email(){
    return this.resetForm.get('email')
  }

}
