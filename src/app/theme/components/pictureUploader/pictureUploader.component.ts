import { Component, ViewChild, Input, Output, EventEmitter, ElementRef, Renderer } from '@angular/core';
import { UploadFile  } from 'ngx-uploader';

import 'style-loader!./pictureUploader.scss';

@Component({
  selector: 'picture-uploader',
  templateUrl: './pictureUploader.html'
})
export class PictureUploaderComponent {

  @Input() defaultPicture: string = 'assets/img/theme/no-photo.png';
  @Input() picture: string = '';

  @Input() uploaderOptions: UploadFile;
  //= { 
  //     //url: 'http://api.ngx-uploader.com/upload',
  //     //filterExtensions: true,
  //     //allowedExtensions: ['jpg', 'png'],
  //     //data: { userId: 12 },
  //     //autoUpload: false,
  //     //fieldName: 'file',
  //     //fieldReset: true,
  //     //maxUploads: 2,
  //     //method: 'POST',
  //     //previewUrl: true,
  //     //withCredentials: false
  // };

  @Input() canDelete: boolean = true;

  @Output() onUpload = new EventEmitter<any>();
  @Output() onUploadCompleted = new EventEmitter<any>();

  @ViewChild('fileUpload') public _fileUpload: ElementRef;

  public uploadInProgress: boolean;
  private previewData: any;
  private inputUploadEvents: EventEmitter<string>;

  constructor(private renderer: Renderer) {
     this.inputUploadEvents = new EventEmitter<string>();
  }


  private beforeUpload(uploadingFile): void {
    const files = this._fileUpload.nativeElement.files;

    if (files.length) {
      const file = files[0];
      this._changePicture(file);

      if (!this._canUploadOnServer()) {
        uploadingFile.setAbort();
      } else {
        this.uploadInProgress = true;
      }
    }
  }

  private bringFileSelector(): boolean {
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }

  private removePicture(): boolean {
    this.picture = '';
    return false;
  }

  private handlePreviewData(data: any) {
    this.previewData = data;
  }

  public startUpload() {
    this.inputUploadEvents.emit('startUpload');
  }

  private _changePicture(file: File): void {
    const reader = new FileReader();
    reader.addEventListener('load', (event: Event) => {
      this.picture = (<any> event.target).result;
    }, false);
    reader.readAsDataURL(file);
  }

  private _onUpload(data): void {
    if (data['done'] || data['abort'] || data['error']) {
      this._onUploadCompleted(data);
    } else {
      this.onUpload.emit(data);
    }
  }

  private _onUploadCompleted(data): void {
    this.uploadInProgress = false;
    const response = JSON.parse(data.response)[0];
    this.onUploadCompleted.emit(response);
  }

  private _canUploadOnServer(): boolean {
    return !!this.uploaderOptions['url'];
  }
}
