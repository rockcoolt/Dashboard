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

import { AppComponent } from '../../app.component';

@Injectable()

export class AuthGuard implements CanActivate {
    
    constructor(private authService: AuthService, private router: Router, private app: AppComponent) {
    }



    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let url: string = state.url;
        if (this.authService.isTokenExpired) {
            this.app.createNotification('Information', `Vous n'êtes pas authentifié.`, 'info');
            this.router.navigate(['/login']);    
            return Observable.of(false);
        } else {
            return this.checkLogin(url)
            .do(authentified => {
                if (!authentified) {
                    this.app.createNotification('Information', `Vous n'êtes pas authentifié.`, 'info');
                    localStorage.clear();
                    this.authService.redirectUrl = url;
                    this.router.navigate(['/login']);    
                }
            }); 
        }    
    }

    private checkLogin(url: string): Observable<boolean> {
       const self = this;
       return Observable.create(function (observer) {            
            self.authService.verify().subscribe({
                next: message => {
                    console.log('message:', message);
                    return observer.next(true);
                },
                error: error => {
                    console.log('error: ', error);
                    return observer.next(false);
                }
            });
        });
    }
}
