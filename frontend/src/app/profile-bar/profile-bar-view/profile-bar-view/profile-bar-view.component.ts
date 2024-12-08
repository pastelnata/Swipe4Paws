import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-bar-view',
  templateUrl: './profile-bar-view.component.html',
  styleUrl: './profile-bar-view.component.css'
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
}
