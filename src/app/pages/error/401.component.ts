import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: '401.component.html'
})
export class P401Component {

  constructor(private router: Router) { }

  onLogin(){
    this.router.navigate(['login']);
  }
}
