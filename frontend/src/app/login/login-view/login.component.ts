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
      this.router.navigate(['/dashboard']);
    },
    error: (error) => {
      console.error('Login failed', error);
      this.errorMessage = 'Invalid email or password';
    },
  });
  }
}
