import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { EmailValidator, EqualPasswordsValidator} from './validators';

// Components
import {
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    BreadcrumbsComponent,
    PictureUploaderComponent
} from './components';

const COMPONENTS = [
    FullLayoutComponent,
    SimpleLayoutComponent,
    BreadcrumbsComponent,
    PictureUploaderComponent
];

const DIRECTIVES = [
    NAV_DROPDOWN_DIRECTIVES,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
];

const PIPES = [

];

const SERVICES = [

];

const VALIDATORS = [
  EmailValidator,
  EqualPasswordsValidator
];

@NgModule({
  declarations: [
    ...PIPES,
    ...DIRECTIVES,
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule,
    TabsModule.forRoot()
  ],
  exports: [
    ...PIPES,
    ...DIRECTIVES,
    ...COMPONENTS
  ]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: ThemeModule,
      providers: [
        ...VALIDATORS,
        ...SERVICES
      ],
    };
  }
}