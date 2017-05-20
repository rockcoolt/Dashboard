import { Component, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { API } from '../../../config'; 

import 'style-loader!./pictureUploader.scss';

@Component({
  selector: 'picture-uploader',
  templateUrl: './pictureUploader.html'
})
export class PictureUploaderComponent {

  @Input() defaultPicture: string = 'assets/img/theme/no-photo.png';
  @Input() picture: string = '';

  @Input() canDelete: boolean = true;

  @Output() onUpload = new EventEmitter<any>();

  @ViewChild('fileUpload') public _fileUpload: ElementRef;

  public uploadInProgress: boolean;
  public previewData: any;
  
  private filesToUpload: Array<File>;

  constructor(private renderer: Renderer) {
    this.filesToUpload = [];
  }
 
    public fileChangeEvent(fileInput: any): void{
        const self = this;  
        this.filesToUpload = <Array<File>> fileInput.target.files;

        if (this.filesToUpload) {
            var reader = new FileReader();
           
            reader.onprogress = function (e : any) {
                console.log('onprogress: ', e);
                self.uploadInProgress = true;
            }

            reader.onload = function (e : any) {
                console.log('onload: ', e);
            }

            reader.onloadend = function (e : any) {
                console.log('onloadend: ', e);
                self.previewData = e.target.result;
                self.uploadInProgress = false;
                self.onUpload.emit(self.filesToUpload);
            }

            if(this.filesToUpload.length > 0){
                reader.readAsDataURL(this.filesToUpload[0]);
            }    
            
        }
    }
 
  public bringFileSelector(): boolean {
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }

  public removePicture(): void {
     this.filesToUpload = [];
     this.previewData = '';
  }
}
