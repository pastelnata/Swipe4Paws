import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private loginService: LoginService, private route: Router) { }

  onLogin() {
    /*this.loginService.login().subscribe((res: any) => {
      console.log(res);
      localStorage.setItem('token', res.token);
      this.route.navigateByUrl('/home');
    });*/
  }
}
