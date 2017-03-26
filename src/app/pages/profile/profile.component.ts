import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { EmailValidator, EqualPasswordsValidator} from '../../theme/validators';

import { NgUploaderOptions } from 'ngx-uploader';

@Component({
  templateUrl: 'profile.component.html'
})
export class ProfileComponent {
  public form: FormGroup;

  public login: AbstractControl;
  public email: AbstractControl;
  public passwords: FormGroup;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public avatar: AbstractControl;

  public profile: any = {
    picture: ''
  };

  public uploaderOptions: NgUploaderOptions = {
    url: 'http://websefefefite.com/upload',
    autoUpload: true,
    calculateSpeed: true
  };

  constructor(private fb: FormBuilder) {
     this.form = fb.group({
      'login': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'avatar': ['', Validators.compose([])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
     });

      this.login = this.form.controls['login'];
      this.passwords = <FormGroup> this.form.controls['passwords'];
      this.password = this.passwords.controls['password'];
      this.repeatPassword = this.passwords.controls['repeatPassword'];
      this.email = this.form.controls['email'];
      this.avatar = this.form.controls['avatar'];
  }

  public onSubmit(values: Object): void {
    console.log('onSubmit');
    console.log(values);
  }

}
