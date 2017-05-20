import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { API } from '../../config';  

@Injectable()
export class UploadService {

    private uploadUrl = `${API.server}${API.route}/upload`;

    constructor() { }

    upload(files: Array<File>): Observable<any> {
        return Observable.create((observer: any) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for(var i = 0; i < files.length; i++) {
                formData.append("avatar", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        observer.next(JSON.parse(xhr.response));
                    } else {
                        observer.error(xhr.response);
                    }
                }
            }
            xhr.open("POST", this.uploadUrl, true);
            xhr.send(formData);
        });
    };

}