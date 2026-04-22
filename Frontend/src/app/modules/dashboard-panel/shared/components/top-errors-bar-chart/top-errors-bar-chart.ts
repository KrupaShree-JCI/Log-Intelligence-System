import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
 
@Component({
  selector: 'app-top-errors-bar-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './top-errors-bar-chart.html',
  styleUrls: ['./top-errors-bar-chart.css']
})
export class TopErrorsBarChartComponent {
 
  @Input() set data(value: any[]) {
   
 
    if (!value || value.length === 0) return;
 
    this.chartData = {
      labels: value.map(d =>
        d.errorMessage
          ? d.errorMessage.substring(0, 25) + '...'
          : 'Unknown'
      ),
      datasets: [
  {
    data: value.map(d => Number(d.count)),
 
    backgroundColor: [
      '#00a862',
    '#bc0000',
   '#c97c00',
     '#210082',
'#0098af'
    
    ],
 
    borderRadius: 8,
    barThickness: 75
  }
]
 
    };
 
   
    this.chartData = { ...this.chartData };
  }
 
  
  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
 
  
  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
 
    plugins: {
      legend: {
        display: false
      }
    },
 
    scales: {
      x: {
        ticks: {
          color: '#94a3b8',
          maxRotation: 0,
          minRotation: 0
        },
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#94a3b8'
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)'
        }
      }
    }
  };
}