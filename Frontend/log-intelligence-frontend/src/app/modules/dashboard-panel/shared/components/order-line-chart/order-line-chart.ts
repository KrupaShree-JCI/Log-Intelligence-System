import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { OrderTrend } from '../../../models/models/chart.model';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
 
@Component({
  selector: 'app-order-line-chart',
  standalone:true,
  imports:[CommonModule,BaseChartDirective],
  templateUrl: './order-line-chart.html',
  styleUrls: ['./order-line-chart.css']
})
export class OrderLineChartComponent implements OnChanges {
 
  @Input() data: OrderTrend[] = [];
 
  chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };
 
  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#cbd5f5' }
      }
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8' },
        grid: { color: '#1e293b' }
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#94a3b8' },
        grid: { color: '#1e293b' }
      }
    }
  };
 
  ngOnChanges(changes: SimpleChanges): void {
    if (this.data && this.data.length > 0) {
 
      this.chartData = {
        labels: this.data.map(d =>
          new Date(d.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        ),
 
        datasets: [
          {
            label: 'Orders',
            data: this.data.map(d => d.orderCount),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,0.2)',
            tension: 0.4,
            fill: true,
            pointRadius: 4
          },
          {
            label: 'Failures',
            data: this.data.map(d => d.failureCount),
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239,68,68,0.2)',
            tension: 0.4,
            fill: true,
            pointRadius: 4
          }
        ]
      };
    }
  }
}
 