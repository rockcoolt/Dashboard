import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { PictureUploaderComponent } from '../../theme/components';
import {EmailValidator, EqualPasswordsValidator} from '../../theme/validators';

import { Selection, User } from '../../models';
import { RegisterService } from '../../services';

@Component({
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  @ViewChild('uploader') public uploader: PictureUploaderComponent;

  public form: FormGroup;
  public login: AbstractControl;
  public email: AbstractControl;
  public role: AbstractControl;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  
  public passwords:FormGroup;

  public roles: Array<Selection> = Selection.roles;
  private files: Array<File>

  constructor(private fb: FormBuilder, private registerService: RegisterService) {
    this.form = fb.group({
      'login': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')}),
      'role': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
     });

    this.login = this.form.controls['login'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
    this.role = this.form.controls['role'];
   }

  public onRegister(values: Object){
    if (this.form.valid) {
      this.registerService.register(this.login.value, this.email.value, this.password.value, this.role.value, this.files).subscribe({
        next: message => {
          console.log(message);
        },
        error: error => {
          console.log(error);
        }   
      });
    }
  }

  public onUpload($event){
    if($event){
      this.files = $event;
      console.log('$event: ', this.files);
    }   
  }

}
