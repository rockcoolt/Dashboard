import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../models';

import { AuthService } from '../../services/auth';
import { RecaptchaComponent} from 'ng-recaptcha';
@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  @ViewChild('captchaRef') private captchaRef: RecaptchaComponent;
  public form: FormGroup;
  public login: AbstractControl;
  public password: AbstractControl;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, ) {
     this.form = fb.group({
      'login': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
     });

      this.login = this.form.controls['login'];
      this.password = this.form.controls['password'];
   }

  public onLogin(captcha: string ,values: User): void {
    if(!!captcha) {
        if (this.form.valid) {
          this.authService.authentication(values.login, values.password, captcha).subscribe({
            next: message => {
              console.log('isLoggedIn: ', this.authService.isLoggedIn);
              if (this.authService.isLoggedIn) {
                console.log('message: ', message);
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'dashboard';
                // Redirect the user
                this.router.navigate([redirect]);
              }
            },
            error: error => {
              console.log(error);
            }
          });
        }
      // this.captchaRef.reset();
    }
  }
}
