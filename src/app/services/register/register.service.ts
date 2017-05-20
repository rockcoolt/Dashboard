import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { API } from '../../config';  

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UploadService } from '../upload'

@Injectable()
export class RegisterService {

     private registerUrl = `${API.server}${API.route}register`;

    constructor( private http: Http, private uploadService: UploadService ) { }

    register(_login: string, _email: string, _password: string, _role: string, filesToUpload: Array<File>): Observable<any> {

        return Observable.create((observer: any) => {
            let _avatar: string = '-1';
            if( !!filesToUpload){
                this.uploadAvatar(filesToUpload).subscribe(
                    result => {
                        _avatar = result.data.id;  
                         this.registerUser(_login, _email, _password, _role, _avatar).subscribe(
                            message => {
                                observer.next(message);
                            },
                            error => {
                                observer.throw(error.json() || 'Server error');
                            }
                        );                
                    }, 
                    error => {
                        observer.throw(error.json() || 'Server error');
                    });           
            }else {
                 this.registerUser(_login, _email, _password, _role, _avatar).subscribe(
                     message => {
                          observer.next(message);
                     },
                     error => {
                        observer.throw(error.json() || 'Server error');
                    }
                ); 
            }
        });
    };


    private uploadAvatar(filesToUpload: Array<File>): Observable<any> {
        return this.uploadService.upload(filesToUpload);
    }

    private registerUser(_login: string, _email: string, _password: string, _role: string, _avatar: string): Observable<any>{
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

         return this.http.post(this.registerUrl, {
            login: _login, 
            email: _email,
            password: _password,
            roles: _role,
            avatar: _avatar
        }, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

}