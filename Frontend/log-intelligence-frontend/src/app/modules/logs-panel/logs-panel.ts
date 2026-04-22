import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogUpload } from './shared/components/log-upload/log-upload';

@Component({
  selector: 'app-logs-panel',
  standalone: true,
  imports: [CommonModule,LogUpload],
  templateUrl: './logs-panel.html'
  
})
export class LogUploadComponent {}