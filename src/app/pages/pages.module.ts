import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { P401Component } from './error/401.component';
import { P404Component } from './error/404.component';
import { P500Component } from './error/500.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  declarations: [
    P401Component,
    P404Component,
    P500Component,
  ]
})
export class PagesModule { }
