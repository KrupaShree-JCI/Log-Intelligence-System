import { Component, OnInit } from '@angular/core';
import { LogViewerService } from './services/log-viewer';
import { LogView } from '../logs-viewer-panel/models/log-view-model';
import { AuthService } from '../auth-panel/services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-log-viewer',
  templateUrl: './logs-viewer.html',
  styleUrls: ['./logs-viewer.css'],
  standalone:true,
  imports:[CommonModule,FormsModule]
})
export class LogViewerComponent implements OnInit {
 
  logs: LogView[] = [];
  filteredLogs: LogView[] = [];
 
  selectedLevel: string = '';
  selectedService: string = '';
  searchText: string = '';
 
  services: string[] = [];
 
  hasAccess = false;
  role = '';
 
  constructor(
    private logService: LogViewerService,
    private authService: AuthService
  ) {}
 
  ngOnInit() {

    const userRole = this.authService.getRole();
    this.role = userRole ? userRole : 'Unknown';
 
    this.hasAccess = this.authService.hasAccess('RawLogs');
 
    if (this.hasAccess) {
      this.fetchLogs();
 
      setInterval(() => {
        this.fetchLogs();
      }, 3000);
    }
  }
 
  fetchLogs() {
    this.logService.getLogs(this.selectedLevel, this.selectedService)
      .subscribe({
        next: (data) => {
          this.logs = data;
          this.filteredLogs = data;
 
          this.services = [...new Set(data.map(l => l.service))];
        },
        error: (err) => {
          console.error('Error fetching logs:', err);
        }
      });
  }
 
  applySearch() {
    this.filteredLogs = this.logs.filter(log =>
      log.event.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
 