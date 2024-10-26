import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsListingComponent } from '../../pets-listing/pets-listing.component';
import { PetsListing } from '../../models/pets-listing';
import { HomeModule } from '../home.module';
import { HomeService } from '../home.service';

declare function showButtons(): void;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PetsListingComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent {
 
  

  constructor(private homeService: HomeService) {
    this.loadListData();
  }
  
  petsListingList: PetsListing[] = []
  showFilterOptions: boolean = false;
  
  loadListData(){
    this.petsListingList = this.homeService.getList();
  }

  //Function that is called upon clicking button Filter
  //Changes visibility of filteroptions
  toggleFilterOptions() {
    this.showFilterOptions = !this.showFilterOptions;
  }


  applyFilters() {
   this.homeService.applyFilters()
  }

  
  filterResults(name: string) {
    this.homeService.filterResults(name);
    this.loadListData();

  }

  filterByType(type: string) {
    this.homeService.filterByType(type);
    this.loadListData();

  }

  filterByGender(gender: string) {
    this.homeService.filterByGender(gender); 
    this.loadListData();
  }

  resetFilters() {
    this.homeService.resetFilters();
    this.loadListData();
    }
}
