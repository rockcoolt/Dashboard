import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import * as io from 'socket.io-client';

import { AuthService } from '../auth';

@Injectable()
export class SocketService {
    private socket: any; 

    constructor(private authService: AuthService){
        this.socket = io.connect('http://localhost:3000', {
            query: {token: authService.Token}
        });
    }

    public get Message(): Observable<any> {               
         return Observable.create((observer: any) => {
            this.socket.on('message', (message: any) => {
                //alert(`Le serveur a un message pour vous : ${message}`);
                observer.next(message) 
            });      
        });
    }   
}