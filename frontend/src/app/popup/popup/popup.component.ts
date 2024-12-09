import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit {
  showPopup = false;

  ngOnInit(): void {
    this.startPopupTimer();
  }

  startPopupTimer(): void {
    setTimeout(() => {
      this.showPopup = true;
    }, 1000)
  }

  popupPet(): void {
    this.showPopup = false;
    console.log("ShowedPet");
    this.startPopupTimer();
  }

  popupPetLike(): void {
    this.showPopup = false;
    console.log("Liked");
    this.startPopupTimer();
  }

  popupClose(): void {
    this.showPopup = false;
    console.log("Closed");
  }
}
