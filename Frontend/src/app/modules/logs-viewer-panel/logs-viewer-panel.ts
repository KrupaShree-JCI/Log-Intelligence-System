import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogViewerComponent } from './logs-viewer';
 
@Component({
  selector: 'app-logs-viewer-panel',
  standalone: true,
  imports: [CommonModule, LogViewerComponent],
  template: `<app-log-viewer></app-log-viewer>`
})
export class LogsViewerPanelComponent {}