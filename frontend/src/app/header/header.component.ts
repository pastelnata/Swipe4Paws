import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  @Output() toggleProfileBar = new EventEmitter<void>();

  constructor(private router: Router, private auth: AuthService) { }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
  
  profileClicked() {
    this.toggleProfileBar.emit();
    console.log('Logged out');
  }

  logoClicked() {
    this.router.navigateByUrl('/');
  }

  favouritesClicked() {
    this.router.navigateByUrl('/favourites');
  }
}
