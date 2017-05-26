import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { JwtHelper } from 'angular2-jwt';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { API } from '../../config';  
import { User } from '../../models';  

@Injectable()
export class AuthService {

    private jwtHelper: JwtHelper = new JwtHelper();
    public redirectUrl: string;
    public token: string = 'token';

    private user: string = 'user';
    private login: string;

    private authenticationUrl = `${API.server}${API.route}login`;
    private logoutUrl = `${API.server}${API.route}logout`;
    private verifyUrl = `${API.server}${API.route}verify`;


    constructor( private router: Router, 
    private http: Http, 
    private cookieService:CookieService, 
    private toastrService: ToastrService) { }

    authentication(_login: string, _password: string, _captcha: string): Observable<any> {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this.http.post(this.authenticationUrl, {login: _login, password: _password, captcha: _captcha}, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    };

    verify(): Observable<any>  {
        return this.http.post(this.verifyUrl, {login: this.Login})
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    logout(): Observable<any>  {
        return this.http.post(this.logoutUrl, {login: this.Login})
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json() || 'Server error'))
        .do(val => {
            this.cookieService.removeAll();
            this.toastrService.success(`Vous êtes déconnecté!`, 'Information'); 
            this.router.navigate(['login']);          
        });

    }

    verifyFail(url: string){
        // this.toastrService.clear();
        this.toastrService.info(`Vous n'êtes pas authentifié!`, 'Information'); 
        this.cookieService.removeAll();
        // Store the attempted URL for redirecting
        this.redirectUrl = url;
        // Navigate to the login page with extras
        // this.router.navigate(['login']);        
    }

    get isTokenExpired () {
        if (!!!this.Token) {
            return true
        }  
        return this.jwtHelper.isTokenExpired(this.Token);
    }

    get User(): User {
        return this.jwtHelper.decodeToken(this.Token);
    }

    get eMail(): string {
        return !!!this.User? null: this.User.email;
    }

    get Role(): string {
        return  !!!this.User? null: this.User.role;
    }

    get Avatar(): string {
        return  this.User.avatar === '-1' ? '../../../assets/img/theme/no-photo.png' : `${API.server}${API.route}downlad/${this.User.avatar}`;
    }

    get Login(): string {
        return  !!!this.User? null: this.User.login;
    }

    get Token(): string {
        return this.cookieService.get(API.tokenKey);
    }

}
