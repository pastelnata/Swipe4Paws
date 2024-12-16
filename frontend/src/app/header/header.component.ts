import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  @Output() toggleProfileBar = new EventEmitter<void>();

  constructor(private router: Router, private auth: AuthService) { }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  shouldShowIcons(): boolean {
    const currentUrl = this.router.url;
    return !(currentUrl === '/login' || currentUrl === '/register' || currentUrl === '/register/shelter' || currentUrl === '/moderator');
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
