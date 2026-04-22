import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsightData } from '../../../models/insight.model';
 
@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommendations.html',
  styleUrls: ['./recommendations.css']
})
export class RecommendationsComponent {
  @Input() data!: InsightData;
}