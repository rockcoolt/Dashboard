import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { ChartsModule } from 'ng2-charts/ng2-charts';

// Theme
import { ThemeModule } from './theme/theme.module';

// Routing Module
import { AppRoutingModule } from './app.routing';

import { AuthService, AuthGuard, SocketService } from './services';

// Application wide providers
const APP_PROVIDERS = [
  AuthGuard,
  AuthService,
  SocketService
];

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    DropdownModule.forRoot(),
    ThemeModule.forRoot(),
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
