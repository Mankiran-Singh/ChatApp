import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class CourseguardService {

  constructor(private authService:AuthServiceService,private route:Router) { }
  canActivate(currentRoute:ActivatedRouteSnapshot,):boolean{
    const {routeConfig}=currentRoute
    const {path}=routeConfig as Route
     if(path?.includes('changepassword') && localStorage.getItem('token') && path?.includes('login')){
      return true;
     }
     else{
      return false;
     }
    }  
    
}
