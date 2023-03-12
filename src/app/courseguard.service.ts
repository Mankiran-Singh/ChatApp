import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
 })
export class CourseguardService implements CanActivate {

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   // provides the route configuration options.
   const { routeConfig } = route; 
   
   // provides the path of the route.
   const { path } = routeConfig as Route; 
     if(path?.includes('changepassword') && localStorage.getItem('token') && path?.includes('login')){
      return true;
     }
     else{
      this.router.navigate(['login'])
      return false;
     }
    }  
    
}
