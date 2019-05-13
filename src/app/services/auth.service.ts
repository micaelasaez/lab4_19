import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  canActivate(
    route: import ('@angular/router').ActivatedRouteSnapshot,
    state: import ('@angular/router').RouterStateSnapshot): boolean
    | import ('@angular/router').UrlTree
    | import ('rxjs').Observable<boolean
    | import ('@angular/router').UrlTree> | Promise<boolean
    | import ('@angular/router').UrlTree> {
      console.log(route);
      console.log(state);
      let aux: boolean;
      // console.log(localStorage.getItem('token'));
      if (localStorage.getItem('token') != null) {
        aux = true;
      } else {
        aux = false;
      }
      return aux;
  }
  constructor() { }
}
