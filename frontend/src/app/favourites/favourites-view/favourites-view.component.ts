import { Component, OnInit } from '@angular/core';
import { FavoriteModel } from '../../models/FavoriteModel';
import { PetsListing } from '../../models/pets-listing';
import { PetsListingComponent } from "../../pets-listing/pets-listing-view/pets-listing.component";
import { CommonModule } from '@angular/common';
import { FavouritesService } from '../favourites.service';
import { HomeService } from '../../home/home.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [PetsListingComponent, CommonModule],
  templateUrl: './favourites-view.component.html',
  styleUrl: './favourites-view.component.css'
})
export class FavouritesComponent implements OnInit {
  constructor(private favouritesService: FavouritesService, private homeService: HomeService, private auth: AuthService) {}
  
  userid: number = 0;

  ngOnInit(): void {

    this.auth.getId().subscribe(
      (id) => {
        this.userid = id;
        console.log(`Loaded userid ${this.userid}`);
        this.loadAndFilterFavourites();
    });
  }

  favourites: FavoriteModel[] = [];
  isFavouritesLoaded: boolean = false;
  isFavouritesEmpty: boolean = true;
  favouritesPetListings: PetsListing[] = [];

  loadAndFilterFavourites() {
    this.favouritesService.getAllFavourites(this.userid).subscribe(
      (favourites: FavoriteModel[]) => {
        this.favourites = favourites;
        console.log('Favourites loaded successfully:', this.favourites);
        this.isFavouritesLoaded = true;
        this.isFavouritesEmpty = (favourites.length === 0);

        this.loadListData();
      }
    );
  }


  loadListData(): void {
    this.homeService.getList().subscribe((petsList: PetsListing[]) => {
      // only adds favourited pets to the array
      petsList.forEach((pet) => {
        if(this.isFavourite(pet, this.favourites)) {
          this.favouritesPetListings.push(pet);
        }
      })
    });
  }

  isFavourite(petListing: PetsListing, favourites: FavoriteModel[]) {
    return favourites.some((favorite) => favorite.petid === petListing.petid);
  }
}
