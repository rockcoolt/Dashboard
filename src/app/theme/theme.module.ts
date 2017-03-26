import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TabsModule } from 'ng2-bootstrap/tabs';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { NgUploaderModule } from 'ngx-uploader';

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
    DropdownModule,
    NgUploaderModule,
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