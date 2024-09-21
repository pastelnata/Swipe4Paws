import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsListingComponent } from '../pets-listing/pets-listing.component';
import { PetsListing } from '../pets-listing';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PetsListingComponent],
  templateUrl: `./home.component.html`,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  petsListingList: PetsListing[] = [
    {
      "id": 1,
      "name": "kicia",
      "gender": "Female",
      "age": 2,
      "type": "cat",
      "city": "Odense",
      "photo": "/assets/kitty1.jpg",
    },
    {
      "id": 2,
      "name": "Pawel",
      "gender": "Male",
      "age": 3,
      "type": "dog",
      "city": "Sonderborg",
      "photo": "/assets/kitty1.jpg",
    },
    {
      "id": 3,
      "name": "miau",
      "gender": "Male",
      "age": 6,
      "type": "dog",
      "city": "Sonderborg",
      "photo": "/assets/kitty1.jpg", 
    },
    {
      "id": 4,
      "name": "Pusia",
      "gender": "Female",
      "age": 1,
      "type": "cat",
      "city": "Sonderborg",
      "photo": "/assets/kitty1.jpg",
    }

  ];
}
