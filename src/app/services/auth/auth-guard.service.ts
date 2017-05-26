import { Injectable, Inject, Host, forwardRef } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';

import { AuthService } from './auth.service';

@Injectable()

export class AuthGuard implements CanActivate {
    
    constructor(private authService: AuthService, 
    private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url: string = state.url;
        return this.checkLogin(url);         
    }

    private checkLogin(url: string): boolean {
        if (!this.authService.isTokenExpired) {
            return true;           
        }
        this.authService.verifyFail(url);
        return false;  
    }  
}
