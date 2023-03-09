import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class CourseguardService {

  constructor(private authService:AuthServiceService,private router:Router) { }
  canActivate():boolean{
    if(this.authService.isLoggedIn()){
      return true
    }else{
        this.router.navigate(['signup']);
        return false
      }
    }  
}
