import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements CanActivate {
  canActivate(
    route: import ('@angular/router').ActivatedRouteSnapshot,
    state: import ('@angular/router').RouterStateSnapshot): boolean
    | import ('@angular/router').UrlTree | import('rxjs').Observable<boolean
    | import ('@angular/router').UrlTree> | Promise<boolean
    | import ('@angular/router').UrlTree> {
      let aux: boolean;
      const helper = new JwtHelperService();
      const token = localStorage.getItem('token');

      if (token != null) {
        const isExpired = helper.isTokenExpired(token);
        const decodedToken = helper.decodeToken(token);
        const expirationDate = helper.getTokenExpirationDate(token);
        console.log('is expired:');
        console.log(isExpired);
        console.log('token:');
        console.log(decodedToken);
        console.log('date:');
        console.log(expirationDate);

        if (isExpired) {
          aux = true;
        } else {
          aux = false;
        }
      }

      return aux;
  }

  constructor() { }
}
