import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsListingComponent } from '../../pets-listing/pets-listing.component';
import { PetsListing } from '../../models/pets-listing';
import { MatSelectModule } from '@angular/material/select';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PetsListingComponent, MatSelectModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  petsListingList: PetsListing[] = [];
  showFilterOptions: boolean = false;
  nameFilter: string = '';
  typeFilter: string = '';
  genderFilter: string = '';

  constructor(private homeService: HomeService) {
    this.loadListData();
  }

  loadListData() {
    this.petsListingList = this.homeService.getList();
  }

  toggleFilterOptions() {
    this.showFilterOptions = !this.showFilterOptions;
  }

  applyFilters() {
    this.homeService.setFilters(this.nameFilter, this.typeFilter, this.genderFilter);
    this.loadListData();
  }

  resetFilters() {
    this.nameFilter = '';
    this.typeFilter = '';
    this.genderFilter = '';
    this.homeService.resetFilters();
    this.loadListData();
  }

  filterByType(type: string) {
    this.typeFilter = type;
    this.applyFilters();
  }

  filterByGender(gender: string) {
    this.genderFilter = gender;
    this.applyFilters();
  }

  sortBy(sortOrder: string) {
   //SortBy logic
  }
}
