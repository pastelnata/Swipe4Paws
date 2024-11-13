import { Injectable } from '@angular/core';
import { PetsListing } from '../models/pets-listing';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeModule } from './home.module';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private petsListingList: PetsListing[] = [];

  private filteredPetsList: PetsListing[] = [];
  private nameFilter: string = '';
  private typeFilter: string = '';
  private genderFilter: string = '';
  private sortOrder: string = '';
  private currentFilters: string[] = [];
  private currentOptions: string[] = [];

  constructor(private http: HttpClient) {
    this.loadListData();
    this.getLoadedList();
    this.resetFilters();
    this.RetriveFilterOptions();
  }

  RetriveFilterOptions(){
    this.petsListingList.forEach(pet => {
      pet.behavior.forEach(behavior => {
        if(!this.currentOptions.includes(behavior)){
          this.currentOptions.push(behavior);
          console.log(this.currentOptions);
        }
      })
    })
  }

  setFilters(name: string, type: string, gender: string, currentFilters: string[]) {
    this.nameFilter = name;
    this.typeFilter = type;
    this.genderFilter = gender;
    this.currentFilters = currentFilters;
    this.applyFilters();
  }

  /**
   Apply filters to the pets list
   If no filters are selected, the function returns the original list
   */
   applyFilters() {
    this.filteredPetsList = this.petsListingList.filter(pet => {
      // Check if the pet matches the name filter
      const petMatchesName = this.nameFilter
        ? pet.name.toLowerCase().includes(this.nameFilter.toLowerCase())
        : true;

      // Check if the pet matches the type filter
      let petMatchesType = false;``

        if(this.typeFilter === "other") {
          if(!(pet.type.toLowerCase() === "cat" || pet.type.toLowerCase() === "dog")){
            petMatchesType = true;
          }
        }else {
          petMatchesType = this.typeFilter
          ? pet.type.toLowerCase() === this.typeFilter.toLowerCase()
          : true;
        }

      // Check if the pet matches the gender filter
      const petMatchesGender = this.genderFilter
        ? pet.gender.toLowerCase() === this.genderFilter.toLowerCase()
        : true;

      // Check if the pet matches any of the behavior filters
      const petMatchesBehavior = this.currentFilters.length === 0
        ? true
        : this.currentFilters.every(filter => pet.behavior.includes(filter));

      // Return true if the pet matches all the filters
      return (
        petMatchesName &&
        petMatchesType &&
        petMatchesGender &&
        petMatchesBehavior
      );
    });
  }

  resetFilters() {
    this.nameFilter = '';
    this.typeFilter = '';
    this.genderFilter = '';
    this.applyFilters();
  }

  getList() {
    return this.filteredPetsList;
  }

  getAllTheOptions() {
    return this.currentOptions;
  }

  //API CALLS:
  loadListData(): Observable<PetsListing[]> {
    return this.http.get<PetsListing[]>('http://localhost:5000/api/pets');
  }
 
    getLoadedList() {
      this.loadListData().subscribe((data: PetsListing[]) => {
        this.petsListingList = data;
      })
    }
}
