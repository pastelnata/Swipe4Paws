import { Component } from '@angular/core';
import { HomeService } from '../../home/home.service';
import { CommonModule } from '@angular/common';
import { PetsListing } from '../../models/pets-listing';
import { HttpClient } from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-swipe',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './swipe.component.html',
  styleUrl: './swipe.component.css'
})
export class SwipeComponent {
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.loadListData().subscribe(
      (data: PetsListing[]) => {
        this.isListLoaded = true;
        this.getNewPet();
      }
    )
  }

  petSlot: number = 0;
  displayedPet: any = null;
  isListLoaded: boolean = false;
  isLiked: boolean = false;
  isRejected: boolean = false;

  getNewPet() {
    if(this.isListLoaded && this.homeService.petsListingList.length > 0) {
      this.petSlot = Math.floor(Math.random() * this.homeService.petsListingList.length);
      this.displayedPet = this.homeService.petsListingList[this.petSlot];
    }
    else {
      this.petSlot = -1;
      this.isListLoaded = false;
    }
  }

  likePet() {
    this.isLiked = true;
    // LOGIC FOR LIKING A PET GOES HERE
    setTimeout(() => {
      this.isLiked = false;
      this.homeService.petsListingList.splice(this.petSlot, 1);
      this.getNewPet();
    }, 300);
  }

  rejectPet() {
    this.isRejected = true;
    setTimeout(() => {
      this.isRejected = false;
      this.homeService.petsListingList.splice(this.petSlot, 1);
      this.getNewPet();
    }, 300);
  }
}