import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsightData } from '../../../models/insight.model';
 
@Component({
  selector: 'app-risk-assessment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './risk-assesment.html',
  styleUrls: ['./risk-assesment.css']
})
export class RiskAssessmentComponent {
  @Input() data!: InsightData;
 
  get riskScore(): number {
    return this.data?.risk?.riskScore || 0;
  }
 
  get riskLevel(): string {
    return this.data?.risk?.riskLevel || 'Unknown';
  }
 
  get progressWidth(): string {
    return `${this.riskScore}%`;
  }
}