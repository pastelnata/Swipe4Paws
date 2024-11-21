import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsListing } from '../../models/pets-listing';
import { NavigationService } from '../navigation.service';
import { HomeComponent } from '../../home/home-view/home.component';
import { HomeService } from '../../home/home.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent {
  @Output() searchResults = new EventEmitter<PetsListing[]>();
  allPets: PetsListing[] = [];
  searchedPets: PetsListing[] = [];

  constructor(private navigationService: NavigationService, private homeService: HomeService) {}

  onKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.searchPets((event.target as HTMLInputElement).value);
    }
  }

  searchPets(query: string) {
    this.navigationService.searchPets(query);
  }
}