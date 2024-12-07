import { Component, EventEmitter, Output } from '@angular/core';
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

  onClose() {
    this.close.emit();
  }
}
