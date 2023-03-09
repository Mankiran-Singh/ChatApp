import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialAuthService, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { AuthServiceService } from '../auth-service.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseguardService } from '../courseguard.service';
import { Router, RouterModule } from '@angular/router';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,SocialLoginModule,RouterModule],
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
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
export class ChangepasswordComponent {

  form: any = {
    email:null,
    newpassword: null,
    confirmpassword: null,
  };
  constructor(private authService:SocialAuthService,private authservice:AuthServiceService,private courseGuard:CourseguardService,private router:Router){}
  xForm=new FormGroup({
    oldPassword:new FormControl('',[Validators.required]),
    newPassword:new FormControl('',[Validators.required,Validators.minLength(5)]),
    confirmPassword:new FormControl('',[Validators.required,Validators.minLength(5)])
  })
  ChangePassword(data:any){
    const {oldPassword,newPassword,confirmPassword} = this.xForm.value
    console.log(this.xForm.value);
  
     if(this.xForm.valid){    
      this.authservice.changePassword(oldPassword,newPassword,confirmPassword).subscribe(
        (res:any)=>{
          console.log(res)
          this.xForm.reset();
          this.authservice.storeToken(res.data);
          this.router.navigate(['home']);
        }
      );
     }else{
      prompt('Invalid form...')
     }
  }
  
  visible:boolean = true;
  changetype:boolean =true;

  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  get newPassword()
  {
    return this.xForm.get('newPassword')
  }
  get confirmPassword()
  {
    return this.xForm.get('confirmPassword')
  }
  get oldPassword(){
    return this.xForm.get('oldPassword')
  }


}
