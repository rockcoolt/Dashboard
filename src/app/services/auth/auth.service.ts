import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { JwtHelper } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { API } from '../../config';  
import { User } from '../../models';  

import { AppComponent } from '../../app.component';

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


    constructor( private router: Router, private http: Http, private app: AppComponent) { }

    authentication(_login: string, _password: string, _captcha: string): Observable<any> {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this.http.post(this.authenticationUrl, {login: _login, password: _password, captcha: _captcha}, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json() || 'Server error'))
        .do(val => {
            localStorage.setItem(this.user, JSON.stringify(val.user));
            localStorage.setItem(this.token, JSON.stringify(val.token));
        });
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
            localStorage.clear();
            this.app.createNotification('Succès', `Vous êtes déconnecté.`, 'success');
            this.router.navigate(['login']);          
        });

    }

    get isTokenExpired () {
        if (!!!this.Token) {
            return true
        }  
        return this.jwtHelper.isTokenExpired(this.Token);
    }

    get User(): User {
        return JSON.parse(localStorage.getItem(this.user));
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
        return JSON.parse(localStorage.getItem(this.token));
    }

}
