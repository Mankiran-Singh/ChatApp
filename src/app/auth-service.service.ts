import { SocialAuthService } from '@abacritt/angularx-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

const url ='http://192.180.0.127:4040/';

const tokenValue=localStorage.getItem('token')
const httpOptions = { 
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
'Authorization': "bearer "+tokenValue})
};
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

logOut(){
  localStorage.clear();
  this.router.navigate(['login']);
}

login(email: string| null | undefined, password: string| null | undefined): Observable<any> {
  return this.http.post(
    url + 'api/User/Login',
    {
      email,
      password,
    },
    httpOptions
  );
}

    SignUp(firstName: string| null | undefined,  lastName: string| null | undefined, email: string| null | undefined, password: string| null | undefined,phone: string| null | undefined,dateOfBirth:string| null | undefined): Observable<any> {
      return this.http.post(
        url + 'api/User/Register',
        {
          firstName,
          lastName,
          email,
          password,
          phone,
          dateOfBirth
        }
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
        }
      );
    }

    forgetPassword(email: string| null | undefined): Observable<any> {
      return this.http.post(
        url + 'api/Password/ForgetPassword',
        {
           email
        }
      );
    }
    
    verifyAndChange(data:any): Observable<any> {
      return this.http.post(
        url + 'api/Password/VerifyMail',
          data,
          httpOptions
      );
    }


   storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue)
   }

   getToken(){
    return localStorage.getItem('token')
   }

   isSignedUp():boolean{
    return !!localStorage.getItem('token')
   }

   isLoggedIn():boolean{
    return !!localStorage.getItem('token')
   }
}
