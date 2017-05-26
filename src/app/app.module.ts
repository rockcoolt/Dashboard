import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { CookieModule } from 'ngx-cookie';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { RecaptchaModule } from 'ng-recaptcha';
import { ToastrModule } from 'ngx-toastr';

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
  RegisterService
];

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    ThemeModule.forRoot(),
    RecaptchaModule.forRoot(),
    CookieModule.forRoot(),
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
