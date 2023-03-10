import { ActivatedRoute, ActivatedRouteSnapshot, CanDeactivate, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface IDeactivateComponent{
  canExit:()=> Observable<boolean> | Promise<boolean> |boolean;
}
export class CandeactivatecourseguardService implements CanDeactivate<IDeactivateComponent>{

  canDeactivate(component :IDeactivateComponent,currentRoute:ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot, nextState:RouterStateSnapshot)
   {
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
