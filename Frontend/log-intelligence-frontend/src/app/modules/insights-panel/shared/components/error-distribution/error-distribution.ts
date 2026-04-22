import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsightData } from '../../../models/insight.model';
 
@Component({
  selector: 'app-error-distribution',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-distribution.html',
  styleUrls: ['./error-distribution.css']
})
export class ErrorDistributionComponent {
 
  @Input() data!: InsightData;
 
  
  formatServiceName(key: string): string {
    return key
      .replace('-service', '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }
 
 
  getSeverityClass(value: number): string {
    if (value > 40) return 'high';
    if (value > 20) return 'medium';
    return 'low';
  }
}