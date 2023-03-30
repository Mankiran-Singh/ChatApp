import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../auth-service.service';
import { CourseguardService } from '../courseguard.service';
import { SocialAuthServiceConfig,SocialAuthService, SocialLoginModule} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import {CandeactivatecourseguardService,} from '../candeactivatecourseguard.service';
import { SafePipe } from 'safe-pipe';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { MatIconModule } from '@angular/material/icon';
import { environment } from 'src/environment';
import { Observable, Subscriber } from 'rxjs';
import { urlImage } from 'src/constant';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule,SocialLoginModule,MaterialModule,MatIconModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
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
    }]
})
export class ProfileComponent{
    usersData:any=[]
    urlImage=urlImage
    constructor(private authService:AuthServiceService,private router:Router){
        this.authService.profile().subscribe((res:any)=>{
          this.usersData.push(res.data)
          this.url1=res.data[0].profileImagePath
          this.profileForm.setValue({
            email:res.data[0].email,
            dateOfBirth:res.data[0].dateOfBirth,
            firstName:res.data[0].firstName,
            lastName:res.data[0].lastName,
            phoneNo:res.data[0].phoneNo,
            image:res.data[0].profileImagePath
          })
        });
    }
    profileForm=new FormGroup({
        email:new FormControl('',[Validators.required,Validators.email]),
        dateOfBirth:new FormControl('',[Validators.required]),
        firstName:new FormControl('',[Validators.required]),
        lastName:new FormControl('',[Validators.required]),
        phoneNo:new FormControl('',[Validators.required]),
        image:new FormControl('',[Validators.required])
      })

    showErrors=false
    url1:string=''
    Update(data:any){
        if(this.profileForm.valid){
           this.authService.update(data).subscribe((res:any)=>{
            console.log("======",res.data[0].profileImagePath)
            this.url1=res.data.profileImagePath
            console.log(res.data)
             this.usersData.push(res.data)
           })
        }else{
            this.showErrors=true
        }
    }
    fileName=''
    fileUpload:any
    file:any 

         getFile(event:any){
          console.log(event.target.files[0]);
           this.file=event.target.files[0]
         }
        url=''
        uploadImage(filepath:any){
        this.fileUpload=filepath;
        //console.log(this.fileUpload)
        let dataimage=''
        this.convertBase64(this.fileUpload)
        let formdata=new FormData()
        formdata.append('file',this.fileUpload)
        this.authService.profileImage(formdata).subscribe((res:any)=>{
          console.log(res)
          dataimage=environment.url+res.data
          this.url=environment.url+res.data.profileImagePath
          console.log("====url==>"+this.url+this.usersData[0].profileImagePath)
        })
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
    goTohome(){
        this.router.navigateByUrl('home')
    }

      get image(){
        return this.profileForm.get('image')
      }
      get email(){
        return this.profileForm.get('email')
      }
      get dateOfBirth(){
        return this.profileForm.get('dateOfBirth')
      }
      get firstName(){
        return this.profileForm.get('firstName')
      }
      get lastName(){
        return this.profileForm.get('lastname')
      }
      get phoneNo(){
        return this.profileForm.get('phoneNo')
      }
}
