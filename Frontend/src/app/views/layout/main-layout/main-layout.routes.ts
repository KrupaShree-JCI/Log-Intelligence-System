import { Routes } from '@angular/router';
import { MainLayout } from './main-layout';
import { AuthGuard } from '../../../core/guards/auth-guard';

export const MAIN_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: MainLayout,
    canActivate:[AuthGuard],
    children: [
      {
        path: 'dashboard',
       
       loadComponent: () =>
        import('../../../modules/dashboard-panel/dashboard-panel')
        .then(c => c.DashboardPanelComponent)
 
      },
      {
        path: 'logs',
       
        loadComponent: () =>
          import('../../../modules/logs-viewer-panel/logs-viewer-panel')
            .then(m => m.LogsViewerPanelComponent)
      },
      {
        path: 'insights',
      
        loadComponent: () =>
          import('../../../modules/insights-panel/insights-panel')
            .then(m => m.InsightsPanelComponent )
      }
    ]
  }
];
 