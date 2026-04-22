import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
 
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css']
})
export class MainLayout implements OnInit {
 
  pageTitle = 'Dashboard';
  username = '';
 
 
  private titleMap: any = {
    dashboard: 'dashboard',
    logs: 'log viewer',
    insights: 'AI Insights',
    upload: 'upload logs'
  };
 
  constructor(private router: Router) {}
 
  ngOnInit() {
 
   
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;
        const match = Object.keys(this.titleMap).find(key => url.includes(key));
        this.pageTitle = this.titleMap[match!] || 'Log Intelligence';
      });
 
  const user = JSON.parse(localStorage.getItem('user') || '{}');
this.username = user.username || 'User';
  }
 
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}