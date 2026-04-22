import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsightService } from './services/insights';
import { AuthService } from '../auth-panel/services/auth';
import { SystemSummaryComponent } from './shared/components/system-summary/system-summary';
import { RiskAssessmentComponent } from './shared/components/risk-assesment/risk-assesment';
import { ErrorDistributionComponent } from './shared/components/error-distribution/error-distribution';
import { AnalysisReasonsComponent } from './shared/components/analysis-reasons/analysis-reasons';
import { RecommendationsComponent } from './shared/components/recommendations/recommendations';



@Component({
  selector: 'app-insights-panel',
  standalone: true,
  imports: [
    CommonModule,
    SystemSummaryComponent,
    RiskAssessmentComponent,
    ErrorDistributionComponent,
    AnalysisReasonsComponent,
    RecommendationsComponent
  ],
  templateUrl: './insights-panel.html',
  styleUrls: ['./insights-panel.css']
})
export class InsightsPanelComponent{
 
  data: any;
  loading = true;
  canViewAI = false;
 
  constructor(
    private insightService: InsightService,
    private authService: AuthService
  ) {}
 
  ngOnInit() {
    this.canViewAI = this.authService.hasAccess('AI');
 
    if (this.canViewAI) {
      this.insightService.getInsights().subscribe({
        next: (res) => {
         
          this.data = res;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }
}