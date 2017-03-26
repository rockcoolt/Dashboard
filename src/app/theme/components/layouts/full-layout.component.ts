import { Component, OnInit } from '@angular/core';

import * as io from 'socket.io-client';

import { AuthService } from '../../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  public disabled: boolean = false;
  public status: {isopen: boolean} = {isopen: false};

  public login: string;
  socket: any;

  constructor(private authService: AuthService) {
    this.login = authService.Login;
    this.socket = io.connect('http://localhost:3000');
    this.socket.on('message', function(message) {
      alert(`Le serveur a un message pour vous : ${message}`);
    });
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
}
