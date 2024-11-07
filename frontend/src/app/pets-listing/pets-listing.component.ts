import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
//Imports interfece PetsListing form pets-listing file.
import { PetsListing } from '../models/pets-listing';

@Component({
  selector: 'app-pets-listing',
  standalone: true,
  imports: [CommonModule],
  //link to html file
  templateUrl: './pets-listing.html',
  //link to css file
  styleUrl: './pets-listing.component.css'
})

export class PetsListingComponent {
  @Input() petsListing!:PetsListing;
}
