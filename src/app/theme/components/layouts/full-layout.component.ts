import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService, SocketService } from '../../../services';


@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  public disabled: boolean = false;
  public status: {isopen: boolean} = {isopen: false};

  public login: string;
  public notifications:Array<string> = [];

  constructor(private authService: AuthService, private socketService: SocketService) {
    this.login = authService.Login;
    this.getNotifications();
  }


  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  public onLogout() {
    this.authService.logout();
  }

  ngOnInit(): void {}

  private getNotifications(){
      this.socketService.Message.subscribe({
        next: message => {
          this.notifications.push(message);
        },
        error: error => {
          console.log(error);
        },
        complete: () => console.log('done'),
      });
  }
}
