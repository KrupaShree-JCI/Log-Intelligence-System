import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRole } from '../../logs-viewer-panel/models/role.model';
import { LoginModel } from '../models/login.model';
 
interface User {
  username: string;
  role: UserRole;
  token?: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http: HttpClient) {}
 
 
  login(data:LoginModel) {
    return this.http.post<User>(
      'https://localhost:7005/api/auth/login',data
      
    );
  }
 

  setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
 
  getUser(): User | null {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }

  getUsername(): string | null {
    return this.getUser()?.username || null;
  }
 

  getRole(): UserRole | null {
    return this.getUser()?.role || null;
  }
 
  
  hasAccess(feature: string): boolean {
    const role = this.getRole();
 
    if (!role) return false;
 
    switch (feature) {
      case 'UploadLogs':
        return [UserRole.Admin, UserRole.Analytics, UserRole.Viewer].includes(role);
 
      case 'KPI':
      case 'Charts':
      case 'AI':
        return [UserRole.Admin, UserRole.Analytics].includes(role);
 
      case 'RawLogs':
        return [UserRole.Admin, UserRole.Viewer].includes(role);
 
      default:
        return false;
    }
  }
}