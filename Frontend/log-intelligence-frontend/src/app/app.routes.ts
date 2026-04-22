import { Routes } from '@angular/router';
import { MainLayout } from './views/layout/main-layout/main-layout';
import { AuthLayout} from './views/layout/auth-layout/auth-layout';
import { LogUpload } from './modules/logs-panel/shared/components/log-upload/log-upload';
import { AuthGuard } from './core/guards/auth-guard';



export const routes: Routes = [
 {
path: '',
redirectTo:'login',
pathMatch:'full'
 },
 {
  path: 'upload',
  canActivate: [AuthGuard],

  loadComponent: () =>
    import('./modules/logs-panel/shared/components/log-upload/log-upload')
      .then(c => c.LogUpload)
},

  {
    path: 'login',
    loadChildren: () =>
      import('./views/layout/auth-layout/auth-layout.routes')
        .then(m => m.AUTH_LAYOUT_ROUTES)
  },
 
  {
    path: 'app',
    loadChildren: () =>
      import('./views/layout/main-layout/main-layout.routes')
        .then(m => m.MAIN_LAYOUT_ROUTES)
  },
 
 
  {
    path: '**',
    redirectTo: 'login'
  }
];
 