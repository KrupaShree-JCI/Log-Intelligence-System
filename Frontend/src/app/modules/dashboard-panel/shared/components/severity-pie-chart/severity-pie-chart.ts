import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { DashboardService } from '../../../services/dashboard';
 
@Component({
  selector: 'app-severity-pie-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './severity-pie-chart.html',
  styleUrls: ['./severity-pie-chart.css']
})
export class SeverityPieChartComponent implements OnInit {
 
  constructor(private dashboardService: DashboardService) {}
 

  chartData: ChartData<'doughnut', number[], string> = {
    labels: ['INFO', 'WARN', 'ERROR', 'DEBUG'],
    datasets: [
      {
        data: [0,0,0,0],
 
        backgroundColor: [
          '#22d3ee', 
          '#f59e0b',
          '#ef4444', 
          '#a78bfa'  
        ],
 
        borderWidth: 0,
        hoverOffset: 10
      }
    ]
  };
 

  chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
 
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#cbd5f5',
          padding: 15
        }
      }
    }
  };
 
  ngOnInit(): void {
    this.dashboardService.getSeverityData().subscribe(res => {
 
      let info = 0, warn = 0, error = 0, debug = 0;
 
      res.forEach(item => {
        if (item.level === 'INFO') info += +item.count;
        if (item.level === 'WARN') warn += +item.count;
        if (item.level === 'ERROR') error += +item.count;
        if (item.level === 'DEBUG') debug += +item.count;
      });
 
      
      const values = [info, warn, error, debug];
    
 
      this.chartData = {
        labels: ['INFO', 'WARN', 'ERROR', 'DEBUG'],
        datasets: [
          {
            data: values,
 
            backgroundColor: [
              '#22d3ee',
              '#f59e0b',
              '#ef4444',
              '#a78bfa'
            ],
 
            borderWidth: 0,
            hoverOffset: 10
          }
        ]
      };
 
     
    });
  }
}
 