import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile-bar-view',
  templateUrl: './profile-bar-view.component.html',
  styleUrl: './profile-bar-view.component.css'
})
export class ProfileBarViewComponent {
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
