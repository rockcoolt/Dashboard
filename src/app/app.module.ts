import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { RecaptchaModule } from 'ng-recaptcha';

// Theme
import { ThemeModule } from './theme/theme.module';

// Routing Module
import { AppRoutingModule } from './app.routing';

import { AuthService, AuthGuard, SocketService, UploadService, RegisterService } from './services';

// Application wide providers
const APP_PROVIDERS = [
  AuthGuard,
  AuthService,
  SocketService,
  UploadService,
  RegisterService,
  AppComponent
];

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ThemeModule.forRoot(),
    RecaptchaModule.forRoot(),
    ChartsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    APP_PROVIDERS,
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
