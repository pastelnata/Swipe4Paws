import { CommonModule } from '@angular/common';
import { ShelterAppService } from './shelter-app.service';
import { PetsListing } from '../models/pets-listing';
import { Component } from '@angular/core';

@Component({
  selector: 'app-shelter-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shelter-app.component.html',
  styleUrl: './shelter-app.component.css'
})
export class ShelterAppComponent {
  petsList: PetsListing[] = []; // an Array to store pet listings
  ifNoPets: boolean = false; // Conditional if no pets are available
  constructor(private shelterAppService: ShelterAppService) {
    this.getPets(); // Load pets on component initialization
  }

  // Fetch the list of pets
  getPets() {
    this.shelterAppService.getPets().subscribe({
      next: (pets: PetsListing[]) => {
        this.petsList = pets;
        this.ifNoPets = pets.length === 0;
      },
      error: (error) => {
        console.error('Error fetching pets:', error);
        this.ifNoPets = true; // Handle errors and show "No pets available" message
      }
    });
  }

  // Add a new pet (no parameter needed)
  addPet() {
    // Create a new pet object (customize the pet details as needed)
    const newPet: PetsListing = {
      petid: Math.floor(Math.random() * 1000), // Just a placeholder for pet ID
      name: 'New Pet', // Placeholder name
      gender: 'Male', // Placeholder gender
      age: 2, // Placeholder age
      type: 'Dog', // Placeholder type
      race: 'Labrador', // Placeholder race
      behaviors: [],
      photo: 'new-pet.jpg', // Placeholder photo URL
      shelterid: 1, // Example shelter ID
      date_added: new Date(),
      description: ''
    };

    this.shelterAppService.addPet(newPet).subscribe({
      next: (addedPet) => {
        this.petsList.push(addedPet); // Update the local pets list after successful addition
        console.log('Pet added:', addedPet);
      },
      error: (error) => {
        console.error('Error adding pet:', error);
      }
    });
  }

  // Remove a pet by ID
  removePet(index: number) {
    const petId = this.petsList[index].petid;
    this.shelterAppService.removePet(petId).subscribe({
      next: () => {
        this.petsList.splice(index, 1); // Remove the pet from the list
        console.log('Pet removed:', petId);
      },
      error: (error) => {
        console.error('Error removing pet:', error);
      }
    });
  }

  // Edit pet details (e.g., update the pet's name)
  editPet(petId: number, updatedPet: Partial<PetsListing>) {
    this.shelterAppService.editPet(petId, updatedPet).subscribe({
      next: (editedPet) => {
        const index = this.petsList.findIndex(pet => pet.petid === petId);
        if (index !== -1) {
          this.petsList[index] = { ...this.petsList[index], ...updatedPet };
          console.log('Pet edited:', editedPet);
        }
      },
      error: (error) => {
        console.error('Error editing pet:', error);
      }
    });
  }
}
