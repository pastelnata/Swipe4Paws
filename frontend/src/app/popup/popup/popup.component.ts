import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouritesService } from '../../favourites/favourites.service';
import { response } from 'express';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent  {
  @Input() showPopup = false;
  @Input() petName: string | null = null;
  @Input() petAge: number | null = null;
  @Input() petPhoto: string | null = null;
  @Input() petId: number | null = null;
  isLiked = false;

  constructor(private favouritesService: FavouritesService) {}
/*
  ngOnInit(): void {
    this.startPopupTimer();
  }

  startPopupTimer(): void {
    setTimeout(() => {
      this.showPopup = true;
    }, 1000)
  }
*/
  popupPet(): void {
    this.showPopup = false;
    console.log("ShowedPet");
 // this.startPopupTimer();
  }

  popupPetLike(): void {
    this.showPopup = false;
    console.log("Liked");
 // this.startPopupTimer();
  }

  popupClose(): void {
    this.showPopup = false;
    console.log("Popup closed");
  }

  toggleLike(): void {
    if (this.petId === null) {
      console.error('Pet ID not provided');
      return;
    }
    this.favouritesService.toggleFavourite(this.petId, 1, this.isLiked).subscribe({
      next: (response) => {
        this.isLiked = !this.isLiked;
        console.log(this.isLiked ? 'Favourite added' : 'Favourite removed', response);
      },
      error: (error) => {
        console.error('Error toggling favourite:', error);
      },
    });
  }
}
