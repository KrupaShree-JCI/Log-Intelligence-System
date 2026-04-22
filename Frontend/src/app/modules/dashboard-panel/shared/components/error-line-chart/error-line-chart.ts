import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ErrorTrend } from '../../../models/models/chart.model';
import { Ticks } from 'chart.js';
import { tick } from '@angular/core/testing';
 
@Component({
  selector: 'app-error-line-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './error-line-chart.html',
  styleUrls: ['./error-line-chart.css']
})
export class ErrorLineChartComponent {
 
  @Input() data: ErrorTrend[] = [];
 
  
  get chartData() {
    return {
      labels: this.data.map(d =>
        new Date(d.time).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      ),
      datasets: [
        {
          label: 'Errors',
          data: this.data.map(d => d.errorCount),
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239,68,68,0.2)',
          fill: true,
          tension: 0.4
        }
      ]
    };
  }
 
  
  chartOptions = {
    responsive: true,
    scales: {
      y: {
        min:0,
        beginAtZero: true,
        
      }
    }
  };
}