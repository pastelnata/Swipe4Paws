import { Injectable } from '@angular/core';
import { PetsListing } from '../models/pets-listing';
import { ApiService } from '../services/api.service';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private petsListingList: PetsListing[] = [
    { id: 1, name: "a", postDate: new Date('2024-10-20'), gender: "Female", age: 2, type: "cat", behavior: ["friendly", "calm"], city: "Odense", photo: "/assets/kitty1.jpg" },
    { id: 2, name: "c", postDate: new Date('2024-10-19'), gender: "Male", age: 3, type: "dog", behavior: ["good with children", "lazy"], city: "Sonderborg", photo: "/assets/kitty1.jpg" },
    { id: 3, name: "b", postDate: new Date('2024-10-22'),gender: "Female", age: 6, type: "kaczka", behavior: ["friendly", "playful"] ,city: "Sonderborg", photo: "/assets/kitty1.jpg" },
    { id: 4, name: "d", postDate: new Date('2024-10-21'),gender: "Male", age: 1, type: "cat", behavior: ["aggressive", "loud"],city: "Sonderborg", photo: "/assets/kitty1.jpg" }
  ];

  private filteredPetsList: PetsListing[] = [];
  private nameFilter: string = '';
  private typeFilter: string = '';
  private genderFilter: string = '';
  private sortOrder: string = '';
  private currentFilters: string[] = [];
  private currentOptions: string[] = [];

  constructor(private apiService: ApiService) {
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
}
