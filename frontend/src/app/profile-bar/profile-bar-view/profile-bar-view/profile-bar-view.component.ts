import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-bar-view',
  templateUrl: './profile-bar-view.component.html',
  styleUrl: './profile-bar-view.component.css',
  standalone: true,
  imports: [MatIconModule, CommonModule]
})
export class ProfileBarViewComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  
  username: string = '';
  isLoggedIn: boolean = false;

  constructor(private router: Router, private auth: AuthService) { }
  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
    
    this.auth.getUsername().subscribe({
      next: (username) => {
        this.username = username || 'Guest';
      },
      error: (error) => {
        console.error('Error fetching username:', error);
        this.username = 'Guest';
      }
    });
  }

  onClose() {
    this.close.emit();
  }

  redirectToFavourites() {
    this.router.navigate(['/favourites'])
  }

  redirectToSettings() {
    this.router.navigate(['/settings'])
  }

  redirectToFunFacts() {
    this.router.navigate(['/fun-facts'])
  }

  redirectToLogin() {
    this.router.navigate(['/login'])
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
