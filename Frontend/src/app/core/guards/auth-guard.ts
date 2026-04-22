import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../modules/auth-panel/services/auth';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
 
  constructor(private auth: AuthService, private router: Router) {}
 
  canActivate(): boolean {
 
   const user = this.auth.getUser();
 
  console.log("AuthGuard check:", user);
 
    
    if (!user) {
      this.router.navigate(['/']);   
    }
 
   
    return true;
    
  }
}