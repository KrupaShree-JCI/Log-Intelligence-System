import { Component } from '@angular/core';
import { LogsService } from '../../../services/logs';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth-panel/services/auth';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-log-upload',
  templateUrl: './log-upload.html',
  styleUrls: ['./log-upload.css'],
  imports:[CommonModule]
})
export class LogUpload {
 
  selectedFile!: File;
  loading = false;
 
  constructor(
    private logsService: LogsService,
    private router: Router,
    private authService: AuthService
  ) {}
 
 
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }
 
 
  upload() {
 
   
    if (!this.selectedFile) {
      alert('Please select a file');
      return;
    }
 
   
    if (!this.selectedFile.name.endsWith('.json')) {
      alert('Only JSON files allowed ');
      return;
    }
 
   
    this.loading = true;
 
    this.logsService.uploadLogs(this.selectedFile).subscribe({
      next: () => {
        this.loading = false;
        alert('Logs uploaded successfully ');
        
        this.router.navigate(['/app/logs']);
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert('Upload failed ');
      }
    });
  }
}