import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  username: string = '';

  constructor(private router: Router, private loginService: LoginService) {}

  //to handle the login form submission
  async login(form: NgForm) {
    if (form.invalid) {
      console.log('Invalid form submission');
      return;
    }
    // Call the login service to send the request
    this.loginService.loginUser(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // Save the token to localStorage or sessionStorage
        localStorage.setItem('token', response.token);
        // Redirect to a protected route (for example, dashboard)
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Invalid email or password';
        //error handling
        if (error.status == 401) {
          this.errorMessage = 'Invalid username or password';
        } else {
          this.errorMessage = 'An error occurred while logging in';
        }
      },
    });
    // logout() {
    //   this.loginService.logoutUser(); //clear token
    //   this.router.navigate(['/']); //redirect to login page
    // } //add <button (click)="logout()">Logout</button>

  }
}
