import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsightData } from '../../../models/insight.model';
 
@Component({
  selector: 'app-system-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-summary.html',
  styleUrls: ['./system-summary.css']
})
export class SystemSummaryComponent {
  @Input() data!:InsightData;
}
 