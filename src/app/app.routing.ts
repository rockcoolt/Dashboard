import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './theme/components/layouts/full-layout.component';
import { SimpleLayoutComponent } from './theme/components/layouts/simple-layout.component';

// Services
import { AuthGuard } from './services';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule'
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [

      {
        path: 'dashboard',
        loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'components',
        loadChildren: './pages/components/components.module#ComponentsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'icons',
        loadChildren: './pages/icons/icons.module#IconsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'widgets',
        loadChildren: './pages/widgets/widgets.module#WidgetsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'charts',
        loadChildren: './pages/chartjs/chartjs.module#ChartJSModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: './pages/profile/profile.module#ProfileModule',
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
