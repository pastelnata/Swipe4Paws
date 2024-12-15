import { Injectable } from '@angular/core';
import { PetsListing } from '../models/pets-listing';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { Router } from '@angular/router';
import { HomeModule } from './home.module';

@Injectable({
  providedIn: 'root'
})

export class HomeService {

  public petsListingList: PetsListing[] = [];
  private filteredPetsListSubject: BehaviorSubject<PetsListing[]> = new BehaviorSubject<PetsListing[]>([]);
  private nameFilter: string = '';
  private typeFilter: string = '';
  private genderFilter: string = '';
  private sortOrder: string = '';
  private currentFilters: string[] = [];
  private currentOptions: string[] = []; //List of current behaviors of all pets so user can filter by them
  private query: string = '';

  constructor(private http: HttpClient, private router: Router)  {
    this.loadListData(); //cals api in future this can be on init or smthng
    this.getLoadedList(); //assignes data to the petsListingList
    this.resetFilters();
    console.log(this.filteredPetsListSubject.value);
    console.log(this.petsListingList);
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

      const behaviors = pet.behaviors.map(b => b.behavior).join(', ');
      const petMatchesBehavior = this.currentFilters.length === 0
        ? true
        : this.currentFilters.every(filter => behaviors.includes(filter));

      return (
        petMatchesName &&
        petMatchesType &&
        petMatchesGender &&
        petMatchesBehavior
      );
    });

    this.filteredPetsListSubject.next(filtered); // Emit the filtered list
    console.log('Filtered Pets List in home service:', filtered);
  }


  resetFilters() {
    this.nameFilter = '';
    this.typeFilter = '';
    this.genderFilter = '';
    this.currentFilters = [];
    this.getLoadedList();
    this.applyFilters();
    
  }

  addPetToBackend(newPet: PetsListing): Observable<PetsListing> {
    return this.http.post<PetsListing>('http://localhost:3000/pets', newPet);
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
  
  //Search bar logic
  apiUrl = 'http://localhost:3000';

  setSearchQuery(query: string) {
    this.query = query;
    console.log("Query: " + this.query);
    this.getLoadedList();
  }

  searchPets(): Observable<PetsListing[]> {
    console.log("SearchPets Clled")
    return this.http.get<PetsListing[]>(`${this.apiUrl}/pets/search?q=${this.query}`);
  }




  getLoadedList() {
    if(this.query !== '') {
      this.searchPets().subscribe(
        (data: PetsListing[]) => {
          console.log("Loaded searched Pets Data in home service:", data); // Log the data to check if it's correct
          this.petsListingList = data;
          this.applyFilters();
          this.query = "";
        },
        (error: any) => {
          console.error("Error loading pets data:", error); // Log any errors that might occur
        }
      );
    }else{
      this.loadListData().subscribe(
        (data: PetsListing[]) => {
          console.log("Loaded Pets Data in home service:", data); // Log the data to check if it's correct
          this.petsListingList = data;
          this.applyFilters();
        },
        (error: any) => {
          console.error("Error loading pets data:", error); // Log any errors that might occur
        }
      );
    }
    }
}
