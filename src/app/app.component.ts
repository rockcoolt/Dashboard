import { Component } from '@angular/core';
import { NotificationsService, Icons, defaultIcons } from 'angular2-notifications';

@Component({
  selector: 'body',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  
  public options = {
        position: ["top", "right"],
        animate: 'scale',
        timeOut: 5000,
        lastOnBottom: true
  };

  constructor(private _service: NotificationsService) {}

  createNotification(title: string, content: string, type: string) {
      this._service.create(title, content, type);
  }

}
