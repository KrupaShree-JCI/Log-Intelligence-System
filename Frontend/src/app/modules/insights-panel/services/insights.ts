import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { InsightData } from '../models/insight.model';
 
@Injectable({
  providedIn: 'root'
})
export class InsightService {
 
  private insightUrl = 'https://localhost:7005/api/insight';
  private dashboardUrl = 'https://localhost:7005/api/dashboard/dashboard';
 
  constructor(private http: HttpClient) {}
 
  getInsights(): Observable<InsightData> {
 
    
 
    const insightReq = this.http.get<any>(this.insightUrl);
    const dashboardReq = this.http.get<any>(this.dashboardUrl);
 
   
    return forkJoin([insightReq, dashboardReq]).pipe(
      map(([insightRes, dashboardRes]) => {
 
        return {
          ...insightRes,
 
          derivedMetrics: dashboardRes.derivedMetrics,
          risk: dashboardRes.risk
 
        } as InsightData;
 
      })
    );
  }
 
  
}