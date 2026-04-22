import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth-panel/services/auth';
import { Observable } from 'rxjs';
import { ErrorTrend } from '../models/models/chart.model';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
 
  private baseUrl = 'https://localhost:7005/api/dashboard';
 
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
 
  getDashboard(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard`);
  }


 
getErrorTrend()
 {
  return this.http.get<ErrorTrend[]>(`${this.baseUrl}/error-trend`);
}


getSeverityData() {
  return this.http.get<any[]>(`${this.baseUrl}/severity`);
}

getTopErrors() {
  return this.http.get<any[]>(`${this.baseUrl}/top-errors`);
}


getOrderTrend() {
  return this.http.get<any[]>(`${this.baseUrl}/order-trend`);
}

}