import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsListing } from '../../models/pets-listing';
import { NavigationService } from '../navigation.service';
import { HomeComponent } from '../../home/home-view/home.component';
import { HomeService } from '../../home/home.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

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

  constructor(
      private homeService: HomeService,
    private authService: AuthService
  ) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  showAlertIfNotLoggedIn(event: Event): void {
    if (!this.isLoggedIn()) {
      event.preventDefault();
      alert('You are not logged in');
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.searchPets((event.target as HTMLInputElement).value);
      this.scrollToSection("filter-buttons");
      console.log("search bar pressed");
    }
  }

  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  searchPets(query: string) {
    // this.navigationService.searchPets(query);
    this.homeService.setSearchQuery(query);
  }
}