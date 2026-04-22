import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './shared/components/login/login';
 
@Component({
  selector: 'app-auth-panel',
  standalone: true,
  imports: [CommonModule, Login],
  template: `<app-login></app-login>`
})
export class AuthPanelComponent {}