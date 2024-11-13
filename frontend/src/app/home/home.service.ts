import { Injectable } from '@angular/core';
import { PetsListing } from '../models/pets-listing';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject  } from 'rxjs';
import { HomeModule } from './home.module';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private petsListingList: PetsListing[] = [];
  private filteredPetsListSubject: BehaviorSubject<PetsListing[]> = new BehaviorSubject<PetsListing[]>([]);
  private filteredPetsList: PetsListing[] = [];
  private nameFilter: string = '';
  private typeFilter: string = '';
  private genderFilter: string = '';
  private sortOrder: string = '';
  private currentFilters: string[] = [];
  private currentOptions: string[] = [];

  constructor(private http: HttpClient)  {
    this.loadListData(); //cals api in future this can be on init or smthng
    this.getLoadedList(); //assignes data to the petsListingList
    this.resetFilters();
    this.RetriveFilterOptions();
    this.RetriveFilterOptions();
    console.log(this.filteredPetsListSubject.value);
    console.log(this.petsListingList);
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
    console.log('Applying filters');
    console.log('Name Filter:', this.nameFilter);
    console.log('Type Filter:', this.typeFilter);
    console.log('Gender Filter:', this.genderFilter);
    console.log('Current Filters:', this.currentFilters);
    
    const filtered = this.petsListingList.filter(pet => {
      const petMatchesName = this.nameFilter
        ? pet.name.toLowerCase().includes(this.nameFilter.toLowerCase())
        : true;

      let petMatchesType = false;
      if (this.typeFilter === "other") {
        if (!(pet.type.toLowerCase() === "cat" || pet.type.toLowerCase() === "dog")) {
          petMatchesType = true;
        }
      } else {
        petMatchesType = this.typeFilter
          ? pet.type.toLowerCase() === this.typeFilter.toLowerCase()
          : true;
      }

      const petMatchesGender = this.genderFilter
        ? pet.gender.toLowerCase() === this.genderFilter.toLowerCase()
        : true;

      const petMatchesBehavior = this.currentFilters.length === 0
        ? true
        : this.currentFilters.every(filter => pet.behavior.includes(filter));

      return (
        petMatchesName &&
        petMatchesType &&
        petMatchesGender &&
        petMatchesBehavior
      );
    });

    this.filteredPetsListSubject.next(filtered); // Emit the filtered list
    console.log('Filtered Pets List:', filtered);
  }


  resetFilters() {
    this.nameFilter = '';
    this.typeFilter = '';
    this.genderFilter = '';
    this.applyFilters();
  }

  getList(): Observable<PetsListing[]> {
    return this.filteredPetsListSubject.asObservable(); // Return as Observable
  }

  getAllTheOptions() {
    return this.currentOptions;
  }

  //API CALLS:
  loadListData(): Observable<PetsListing[]> {
    return this.http.get<PetsListing[]>('http://localhost:3000/pets');
  }
 
  getLoadedList() {
    this.loadListData().subscribe(
      (data: PetsListing[]) => {
        console.log("Loaded Pets Data:", data); // Log the data to check if it's correct
        this.petsListingList = data;
        this.applyFilters();
        console.log(this.petsListingList);
      },
      (error: any) => {
        console.error("Error loading pets data:", error); // Log any errors that might occur
      }
    );
  }
}
