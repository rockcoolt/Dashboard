import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../theme/theme.module';

import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register.routing';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ThemeModule,
    ReactiveFormsModule
  ],
  declarations: [ RegisterComponent ]
})
export class RegisterModule { }