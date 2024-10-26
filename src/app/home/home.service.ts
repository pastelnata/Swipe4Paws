import { Injectable } from '@angular/core';
import { PetsListing } from '../models/pets-listing';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private petsListingList: PetsListing[] = [
    { id: 1, name: "kicia", gender: "Female", age: 2, type: "cat", city: "Odense", photo: "/assets/kitty1.jpg" },
    { id: 2, name: "Pawel", gender: "Male", age: 3, type: "dog", city: "Sonderborg", photo: "/assets/kitty1.jpg" },
    { id: 3, name: "miau", gender: "Female", age: 6, type: "dog", city: "Sonderborg", photo: "/assets/kitty1.jpg" },
    { id: 4, name: "Pusia", gender: "Male", age: 1, type: "cat", city: "Sonderborg", photo: "/assets/kitty1.jpg" }
  ];

  private filteredPetsList: PetsListing[] = [];
  private nameFilter: string = '';
  private typeFilter: string = '';
  private genderFilter: string = '';

  constructor() {
    this.resetFilters();
  }

  setFilters(name: string, type: string, gender: string) {
    this.nameFilter = name;
    this.typeFilter = type;
    this.genderFilter = gender;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredPetsList = this.petsListingList.filter(pet => {
      const matchesName = pet.name.toLowerCase().includes(this.nameFilter.toLowerCase());
      const matchesType = this.typeFilter ? pet.type.toLowerCase() === this.typeFilter.toLowerCase() : true;
      const matchesGender = this.genderFilter ? pet.gender.toLowerCase() === this.genderFilter.toLowerCase() : true;
      return matchesName && matchesType && matchesGender;
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
}
