import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { API } from '../../config';  

@Injectable()
export class AuthService {
    public isLoggedIn: boolean = false;
    public redirectUrl: string;
    public token: string;

    private login: string;
    private authenticationUrl = `${API.server}${API.route}login`;
    private logoutnUrl = `${API.server}${API.route}logout`;

    constructor( private router: Router, private http: Http ) { }

    authentication(_login: string, _password: string): Observable<any> {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this.http.post(this.authenticationUrl, {login: _login, password: _password}, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json() || 'Server error'))
        .do(val => {
            this.isLoggedIn = true;
            this.login = _login;
            this.token = val.token;
        });
    };

    logout(): Observable<any>  {
        return this.http.get(this.logoutnUrl)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json() || 'Server error'))
        .do(val => {
            this.isLoggedIn = false;
            this.router.navigate(['login']);
        });

    }

    get Login(): string {
        return this.login;
    }

    get Token(): string {
        return this.token;
    }

}
