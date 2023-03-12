import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialAuthService, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { AuthServiceService } from '../auth-service.service';
import { FormControl,FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,AbstractControl} from '@angular/forms';
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
export class ChangepasswordComponent implements OnInit {

  form: any = {
    email:null,
    newpassword: null,
    confirmpassword: null,
  };
  changepassFormForm:any
  constructor(private fb:FormBuilder,private authService:SocialAuthService,private authservice:AuthServiceService,private courseGuard:CourseguardService,private router:Router){}
  ngOnInit(): void {
    const fb = this.fb; 
     this.changepassFormForm=fb.group({
      oldPassword:new FormControl('',[Validators.required]),
      newPassword:new FormControl('',[Validators.required,Validators.minLength(5)]),
      confirmPassword:new FormControl('',[Validators.required]),
    },{
      Validators:this.mustMatch('newPassword','confirmPassword')
    }
    )
  }
 
  

 
  mustMatch(controlName:string,matchingControlName:string){
    return (formGroup:FormGroup)=>{
      const control=formGroup.controls[controlName]
      const matchingcontrol=formGroup.controls[matchingControlName]
      if(matchingcontrol.errors && !matchingcontrol.errors['mustMatch']){
        return
      }
        if(control.value!=matchingcontrol.value){
          matchingcontrol.setErrors({mustMatch:true})
        }else{
          matchingcontrol.setErrors(null)
        }
    }
  }


 showErrors=false;
  ChangePassword(){
     if(this.changepassFormForm.valid){    
      const {oldPassword,newPassword,confirmPassword} = this.changepassFormForm.value
      this.authservice.changePassword(oldPassword,newPassword,confirmPassword).subscribe(
        (res:any)=>{
          console.log(res)
          this.changepassFormForm.reset();
          this.router.navigate(['home']);
        }
      );
     }else{ 
      this.showErrors=true;
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
    return this.changepassFormForm.get('newPassword')
  }
  get confirmPassword()
  {
    return this.changepassFormForm.get('confirmPassword')
  }
  get oldPassword(){
    return this.changepassFormForm.get('oldPassword')
  }

  cancel(){
    this.router.navigate(['home'])
  }
}
