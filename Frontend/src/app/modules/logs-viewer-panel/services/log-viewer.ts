import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogView } from '../models/log-view-model';
import { AuthService } from '../../auth-panel/services/auth';
 
@Injectable({
  providedIn: 'root'
})
export class LogViewerService {
 
  private baseUrl = 'https://localhost:7005/api/logs';
 
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
 
 getLogs(level?: string, service?: string) {
 
  
  let url = `${this.baseUrl}/filter`;
 
  const params: string[] = [];
 
  if (level) params.push(`level=${level}`);
  if (service) params.push(`service=${service}`);
 
  if (params.length > 0) {
    url += `?${params.join('&')}`;
  }
 
 
 

 
  
  return this.http.get<LogView[]>(url);
}
 
}