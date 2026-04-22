import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginModel } from '../../../models/login.model';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
 

  username: string = '';
  password: string = '';
  showPopup: boolean = false;
  popupMessage: string = '';
  isSuccess: boolean = false;
 
  constructor(private auth: AuthService, private router: Router) {}
 
 
  login() {
    console.log("Login clicked");
 
    const loginData: LoginModel = {
  username: this.username,
  password: this.password
};
 
this.auth.login(loginData).subscribe({
 
      next: (res: any) => {
        console.log("LOGIN SUCCESS:", res);
        this.auth.setUser(res);
        this.popupMessage = "Login Successful!";
        this.isSuccess = true;
        this.showPopup = true;
      },
 
      error: (err) => {
        console.log("LOGIN FAILED:", err);
 
        
        this.popupMessage = "Invalid username or password";
        this.isSuccess = false;
        this.showPopup = true;
        this.password = '';
      }
 
    });
  }
  closePopup() {
    this.showPopup = false;
 
   
    if (this.isSuccess) {
      this.router.navigate(['/upload']);
    }
  }
}
 