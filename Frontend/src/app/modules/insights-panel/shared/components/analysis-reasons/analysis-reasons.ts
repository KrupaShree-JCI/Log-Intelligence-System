import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsightData } from '../../../models/insight.model';
 
@Component({
  selector: 'app-analysis-reasons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analysis-reasons.html',
  styleUrls: ['./analysis-reasons.css']
})
export class AnalysisReasonsComponent {
  @Input() data!: InsightData;
}