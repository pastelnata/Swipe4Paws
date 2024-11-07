import { Injectable } from '@angular/core';
import { PetsListing } from '../models/pets-listing';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private petsListingList: PetsListing[] = [
    { id: 1, name: "a", postDate: new Date('2024-10-20'), gender: "Female", age: 2, type: "cat", behavior: ["friendly", "calm"], city: "Odense", photo: "/assets/kitty1.jpg" },
    { id: 2, name: "c", postDate: new Date('2024-10-19'), gender: "Male", age: 3, type: "dog", behavior: ["good with children", "lazy"], city: "Sonderborg", photo: "/assets/kitty1.jpg" },
    { id: 3, name: "b", postDate: new Date('2024-10-22'),gender: "Female", age: 6, type: "dog", behavior: ["friendly", "playful"] ,city: "Sonderborg", photo: "/assets/kitty1.jpg" },
    { id: 4, name: "d", postDate: new Date('2024-10-21'),gender: "Male", age: 1, type: "cat", behavior: ["aggressive", "loud"],city: "Sonderborg", photo: "/assets/kitty1.jpg" }
  ];

  private filteredPetsList: PetsListing[] = [];
  private nameFilter: string = '';
  private typeFilter: string = '';
  private genderFilter: string = '';
  private sortOrder: string = '';
  private currentFilters: string[] = [];
  private currentOptions: string[] = [];

  constructor() {
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

  applyFilters() {
    this.filteredPetsList = this.petsListingList.filter(pet => {
      const matchesName = pet.name.toLowerCase().includes(this.nameFilter.toLowerCase());
      const matchesType = this.typeFilter ? pet.type.toLowerCase() === this.typeFilter.toLowerCase() : true;
      const matchesGender = this.genderFilter ? pet.gender.toLowerCase() === this.genderFilter.toLowerCase() : true;  
      const matchesbehavior = this.currentFilters.length === 0 || this.currentFilters.every(filter => pet.behavior.includes(filter));
      return matchesName && matchesType && matchesGender && matchesbehavior;
    });
  }

  resetFilters() {
    this.nameFilter = '';
    this.typeFilter = '';
    this.genderFilter = '';
    this.filteredPetsList = this.petsListingList;
  }

  getList() {
    return this.filteredPetsList;
  }

  getAllTheOptions() {
    return this.currentOptions;
  }
}
