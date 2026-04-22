import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-card.html',
  styleUrls: ['./kpi-card.css']
})
export class KpiCardComponent {
 
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() subText: string = '';
  @Input() status: 'good' | 'warning' | 'critical' = 'good';
 
  get statusClass(): string {
    switch (this.status) {
      case 'good': return 'kpi-good';
      case 'warning': return 'kpi-warning';
      case 'critical': return 'kpi-critical';
      default: return '';
    }
  }
}