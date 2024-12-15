import { Component } from '@angular/core';
import { HomeService } from '../../home/home.service';
import { CommonModule } from '@angular/common';
import { PetsListing } from '../../models/pets-listing';
import { HttpClient } from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';
import { FavouritesService } from '../../favourites/favourites.service';
import { FavoriteModel } from '../../models/FavoriteModel';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-swipe',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './swipe.component.html',
  styleUrl: './swipe.component.css'
})
export class SwipeComponent {
  constructor(private homeService: HomeService, private favouritesService: FavouritesService, private auth: AuthService) {}

  userId: number = 0;

  ngOnInit(): void {

    // 1. loads userid
    this.auth.getId().subscribe(
      (id: number) => {
      this.userId = id;
      // 2. loads the pets
      this.homeService.loadListData().subscribe(
        (petsListings: PetsListing[]) => {
          // 3. loads the favourites
          this.favouritesService.getAllFavourites(id).subscribe(
            (favourites: FavoriteModel[]) => {
              // 4. filters the list to only contain the pets without a like
              this.homeService.petsListingList = petsListings.filter(
                (petsListing) => !favourites.some((favourite) => petsListing.petid === favourite.petid)
              )
              this.isListLoaded = true;
              // randomly picks a pet from the list (that's the one that will be shown first)
              this.getNewPet();
            }
          )
        }
      )
    })
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

    // Database call
    this.favouritesService.addFavourite(this.displayedPet.petid, this.userId) //for now userid set to 1 by default, waiting for login logic
      .subscribe({
        next: (response) => {
          console.log('Favourite added:', response);
        },
        error: (error) => {
          console.error('Error adding favourite:', error);
        }
      });

    // Timeout needed for the animation to work
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