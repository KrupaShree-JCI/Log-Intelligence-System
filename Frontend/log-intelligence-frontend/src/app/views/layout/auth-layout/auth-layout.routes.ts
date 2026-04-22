import { Routes } from '@angular/router';
import { AuthLayout } from './auth-layout';
 
export const AUTH_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../../../modules/auth-panel/auth-panel')
            .then(m => m.AuthPanelComponent )
      }
    ]
  }
];