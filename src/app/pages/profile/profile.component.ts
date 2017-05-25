import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { EmailValidator, EqualPasswordsValidator} from '../../theme/validators';
import { AuthService } from '../../services'

@Component({
  templateUrl: 'profile.component.html'
})
export class ProfileComponent {
  public form: FormGroup;

  public login: AbstractControl;
  public email: AbstractControl;
  public oldPassword: AbstractControl;
  public passwords: FormGroup;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public avatar: AbstractControl;

  private files: Array<File>

  constructor(private fb: FormBuilder, private authService: AuthService) {
     this.form = fb.group({
      'login': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'avatar': ['', Validators.compose([])],
      'oldPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
     });

      this.login = this.form.controls['login'];
      this.oldPassword = this.form.controls['oldPassword'];
      this.passwords = <FormGroup> this.form.controls['passwords'];
      this.password = this.passwords.controls['password'];
      this.repeatPassword = this.passwords.controls['repeatPassword'];
      this.email = this.form.controls['email'];
      this.avatar = this.form.controls['avatar'];

      this.login.setValue(this.authService.Login);
      this.email.setValue(this.authService.eMail);
  }

  public onSubmit(values: Object): void {
    console.log('onSubmit');
    console.log(values);
    console.log(this.files);
  }


  public onUpload($event){
    if($event){
      this.files = $event;
      console.log('$event: ', this.files);
    }   
  }

}
