import { Component, ViewChild } from '@angular/core';
import { PictureUploaderComponent } from '../../theme/components';

@Component({
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  @ViewChild('uploader') public uploader: PictureUploaderComponent;

  constructor() { }

  public onRegister(){
    // this.uploader.startUpload();
  }

  private onUploadCompleted($event){
    console.log('$event: ', $event);
  }

}
