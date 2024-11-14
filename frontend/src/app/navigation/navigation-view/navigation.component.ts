import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsListing } from '../../models/pets-listing';
import { NavigationService } from '../navigation.service';
import { PetsListingComponent } from '../../pets-listing/pets-listing-view/pets-listing.component';


@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
   <h1>Navigation is working</h1>
    <!-- Search engine, can be used -->
    <form>
        <input type="text" placeholder="Filter by name" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">
        Search</button>
    </form>
  `,
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})

export class NavigationComponent {
  @Output() searchResults = new EventEmitter<PetsListing[]>();
  allPets: PetsListing[] = [];
  searchedPets: PetsListing[] = [];

  constructor(private navigationService: NavigationService) {}

  onKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.searchPets((event.target as HTMLInputElement).value);
    }
  }

  async searchPets(query: string) {
    await this.navigationService.searchPets(query).subscribe({
      next: (data) => {
        this.searchedPets = data;
        this.searchResults.emit(this.searchedPets);
        console.log(this.searchedPets);
      },
      error: (error) => {
        console.error("Error searching pets:", error);
      }
    });
  }
}