import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { P404Component } from './error/404.component';
import { P500Component } from './error/500.component';
import { RegisterComponent } from './register/register.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  declarations: [
    P404Component,
    P500Component,
    RegisterComponent,
  ]
})
export class PagesModule { }
