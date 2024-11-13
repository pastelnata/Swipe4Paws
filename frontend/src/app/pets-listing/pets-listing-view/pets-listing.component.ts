import { CommonModule } from '@angular/common';
//Imports interfece PetsListing form pets-listing file.
import { PetsListing } from '../../models/pets-listing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-pets-listing',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  //link to html file
  templateUrl: './pets-listing.html',
  //link to css file
  styleUrl: './pets-listing.component.css'
})

export class PetsListingComponent {
  @Input() petsListing!:PetsListing;
  faHeart = faHeart;
  isLiked = false;

  toggleLike() {
    this.isLiked = !this.isLiked;
  }
}
