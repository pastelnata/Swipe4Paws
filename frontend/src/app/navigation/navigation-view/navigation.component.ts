import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
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
  @ViewChild(HomeComponent) homeComponent!: HomeComponent;

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
      const inputElement = event.target as HTMLInputElement;
      this.searchPets(inputElement.value);
      inputElement.value = "";
      this.navigationService.scrollToSection();
    }
  }

  searchPets(query: string) {
    this.homeService.resetFilters();
    this.homeService.setSearchQuery(query);
  }
}