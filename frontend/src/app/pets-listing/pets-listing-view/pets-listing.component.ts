import { CommonModule } from '@angular/common';
//Imports interfece PetsListing form pets-listing file.
import { PetsListing } from '../../models/pets-listing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { FavouritesService } from '../../favourites/favourites.service';
import { FavoriteModel } from '../../models/FavoriteModel';

@Component({
  selector: 'app-pets-listing',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  //link to html file
  templateUrl: './pets-listing.html',
  //link to css file
  styleUrl: './pets-listing.component.css'
})

export class PetsListingComponent implements OnInit {
  @Input() petsListing!:PetsListing;
  @Input() favourites: FavoriteModel[] = [];
  faHeart = faHeart;
  isLiked = false;

  constructor(private favouritesService: FavouritesService) {}

  getBehaviorString(): string {
    return this.petsListing.behaviors.map(b => b.behavior).join(', ');
  }


  ngOnInit(): void {
    // Checking if the pet is favourited
    this.favourites.forEach(favourite => {
      if(favourite.petid === this.petsListing.petid) {
        this.isLiked = true;
      }
    })
  }

  toggleLike() {
    this.isLiked = !this.isLiked;
    
    if (this.isLiked) {
      this.favouritesService.addFavourite(this.petsListing.petid, 1) //for now userid set to 1 by default, waiting for login logic
      .subscribe({
        next: (response) => {
          console.log('Favourite added:', response);
        },
        error: (error) => {
          console.error('Error adding favourite:', error);
        }
      });
    }
    else {
      this.favouritesService.deleteFavourite(this.petsListing.petid, 1) //for now userid set to 1 by default, waiting for login logic
      .subscribe({
        next: (response) => {
          console.log('Favourite removed:', response);
        },
        error: (error) => {
          console.error('Error adding favourite:', error);
        }
      });
    }
  }
}

