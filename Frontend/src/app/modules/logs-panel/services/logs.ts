import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth-panel/services/auth'; // adjust path
 
@Injectable({
  providedIn: 'root'
})
export class LogsService {
 
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}
 
  
  uploadLogs(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(
      'https://localhost:7005/api/logs/upload',
      formData
        
      
    );
  }
}