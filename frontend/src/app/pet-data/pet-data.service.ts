import { Injectable } from '@angular/core';
import { PetsListing } from '../models/pets-listing';

@Injectable({
  providedIn: 'root'
})
export class PetDataService {
  private pets: PetsListing[] = [];

  addPet(pet: PetsListing): void {
    this.pets.push(pet);
  }

  getPets(): PetsListing[] {
    return this.pets;
  }

  clearPets(): void {
    this.pets = [];
  }
}
