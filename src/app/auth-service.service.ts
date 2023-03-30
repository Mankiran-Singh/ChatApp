import { SocialAuthService } from '@abacritt/angularx-social-login';
import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Constant } from 'src/constant';

const url ='http://192.180.2.128:5050/api/';

const tokenValue=localStorage.getItem('token')
const httpOptions = { 
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
'Authorization': "bearer "+tokenValue})
};
const token = localStorage.getItem('token') ;
const headers=new HttpHeaders({
    'Authorization':'bearer '+token
});
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
private authChangeSub = new Subject<boolean>();
private extAuthChangeSub = new Subject<any>();
public authChanged = this.authChangeSub.asObservable();
public extAuthChanged = this.extAuthChangeSub.asObservable();


constructor(private http: HttpClient , private router: Router, private externalAuthService: SocialAuthService) {}

SignOutExternal (){
  this.externalAuthService.signOut();
}

signOut(){
  localStorage.clear();
  this.router.navigate(['signup']);
}
logOut()
{
  localStorage.clear();
  this.router.navigate(['login'])
}
login(email: string| null | undefined, password: string| null | undefined): Observable<any> {
  return this.http.post(
    url + 'Login',
    {
      email,
      password,
    },
    httpOptions
  );
}

    SignUp(firstName: string| null | undefined,  lastName: string| null | undefined, email: string| null | undefined, password: string| null | undefined,phoneNo: string| null | undefined,dateOfBirth:string| null | undefined): Observable<any> {
      return this.http.post(
        url + 'User/Registration',
        {
          firstName,
          lastName,
          email,
          password,
          phoneNo,
          dateOfBirth
        },
        httpOptions
      );
    }

   resetPassword(newPassword:string|null|undefined,confirmPassword:string|null|undefined): Observable<any> {
      return this.http.post(
        url + 'api/Password/ResetPassword',
        {
          newPassword,
          confirmPassword
        },
         httpOptions
      );
    }
  

    changePassword(oldPassword:string|null|undefined,newPassword:string|null|undefined,confirmPassword:string|null|undefined): Observable<any> {
      return this.http.post(
        url + 'api/User/ChangePassword',
        {
          oldPassword,
          newPassword,
          confirmPassword
        },
        httpOptions
      );
    }

    forgetPassword(email: string| null | undefined): Observable<any> {
      return this.http.post(
        url + 'api/Password/ForgetPassword',
        {
           email
        }
        ,httpOptions
      );
    }


   storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue)
   }

   getToken(){
    return localStorage.getItem('token')
   }

   isLoggedIn():boolean{
    return !!localStorage.getItem('token')
   }
  
    usergetMatch(searchText:string)
    {
      return this.http.get(url+"User?searchString="+searchText,{headers:headers})
    }

    userGet()
    {
     return this.http.get(url+Constant.Url.user)
    }
  
   dataEmitter=new EventEmitter<string>();
   raiseDataEmitterEvent(data:string)
   {
       this.dataEmitter.emit(data)
   }

   logout()
   {
     return this.http.post(url+Constant.Url.logout,{headers:headers})
   }
   SignOut()
   {
     localStorage.clear();
   }
   fileupload(file:any,type:number,email:string){
   const params={
     type:type,
     Email:email
   }
   return this.http.post(url+Constant.Url.fileUpload,file,{params:params})
   }
   profile(){
    return this.http.get(url+Constant.Url.profile)
   }
   update(id:string){
    return this.http.put(url+Constant.Url.update,id)
   }
   profileImage(file:any){
     return this.http.post(url+Constant.Url.profileImage,file)
   }

   dataEmit=new Subject<any>();
    raiseDataEmitter()
    {
       return this.dataEmit.next('')
    }
}
