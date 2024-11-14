import { Component, Input } from '@angular/core';
import { PetsListingComponent } from '../../pets-listing/pets-listing-view/pets-listing.component';
import { PetsListing } from '../../models/pets-listing';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pets-details',
  standalone: true,
  imports: [PetsListingComponent, CommonModule],
  templateUrl: './pets-details.component.html',
  styleUrl: './pets-details.component.css'
})
export class PetsDetailsComponent {
  @Input() petsListing!:PetsListing;
} 
