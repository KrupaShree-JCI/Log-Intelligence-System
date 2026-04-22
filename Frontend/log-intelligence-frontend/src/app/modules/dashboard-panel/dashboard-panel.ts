import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiCardComponent } from './shared/components/kpi-card/kpi-card';
import { DashboardService } from './services/dashboard';
import { BaseChartDirective} from 'ng2-charts';
import { KpiModel } from './models/models/kpis.model';
import { ErrorTrend, TopError,OrderTrend } from './models/models/chart.model';
import { ErrorLineChartComponent } from './shared/components/error-line-chart/error-line-chart';
import { SeverityPieChartComponent } from './shared/components/severity-pie-chart/severity-pie-chart';
import { TopErrorsBarChartComponent } from './shared/components/top-errors-bar-chart/top-errors-bar-chart';
import { OrderLineChartComponent } from './shared/components/order-line-chart/order-line-chart';
import { AuthService } from '../auth-panel/services/auth';
@Component({
  selector: 'app-dashboard-panel',
  standalone: true,
  imports: [CommonModule, KpiCardComponent,ErrorLineChartComponent,SeverityPieChartComponent, TopErrorsBarChartComponent,OrderLineChartComponent],
  templateUrl: './dashboard-panel.html',
  styleUrls: ['./dashboard-panel.css']
})
export class DashboardPanelComponent implements OnInit {

hasKpiAccess = false;
hasChartAccess = false;
role: string = '';
kpis!: KpiModel;
errorTrendData: ErrorTrend[] = [];
topErrorData: TopError[]=[];
orderTrendData:OrderTrend[]=[];

  constructor(private dashboardService: DashboardService, private authService:AuthService) {}
 
  ngOnInit(): void {

   
const userRole = this.authService.getRole();
this.role = userRole ? userRole : 'Unknown';
 
this.hasKpiAccess = this.authService.hasAccess('KPI');
this.hasChartAccess = this.authService.hasAccess('Charts');
 
    
    this.dashboardService.getDashboard().subscribe(res => {
      this.kpis = {
        ...res.kpis,
        riskScore: res.risk.riskScore,
        riskLevel: res.risk.riskLevel
        
      };
    });
     this.dashboardService.getErrorTrend().subscribe(res => {
    this.errorTrendData = res;
     });
     this.dashboardService.getTopErrors().subscribe(res => {
      console.log("TOP ERRORS",res)
    this.topErrorData = res;
     });
     this.dashboardService.getOrderTrend().subscribe(res => {
      console.log("order trend",res)
    this.orderTrendData = res;
     });

  }
 
 
  getStatus(type: string, value: number): 'good' | 'warning' | 'critical' {
 
    switch (type) {
     
      case 'failureRate':
        if (value < 5) return 'good';
        if (value < 15) return 'warning';
        return 'critical';
 
      case 'errorRate':
        if (value < 5) return 'good';
        if (value < 15) return 'warning';
        return 'critical';
 
      case 'avgResponseTime':
        if (value < 200) return 'good';
        if (value < 500) return 'warning';
        return 'critical';
 
      case 'riskScore':
        if (value < 30) return 'good';
        if (value < 70) return 'warning';
        return 'critical';
 
      default:
        return 'good';
    }
  }
  
}


