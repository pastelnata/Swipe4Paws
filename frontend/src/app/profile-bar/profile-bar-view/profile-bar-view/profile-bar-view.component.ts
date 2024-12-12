import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile-bar-view',
  templateUrl: './profile-bar-view.component.html',
  styleUrl: './profile-bar-view.component.css',
  standalone: true,
  imports: [MatIconModule]
})
export class ProfileBarViewComponent {
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) { }

  onClose() {
    this.close.emit();
  }

  redirectToFavourites() {
    this.router.navigate(['/favourites'])
  }

  redirectToFunFacts() {
    this.router.navigate(['/fun-facts'])
  }
}
