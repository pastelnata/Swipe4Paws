import { Component } from '@angular/core';
import { PetDataService } from '../../pet-data/pet-data.service';
import { PetsListing } from '../../models/pets-listing';

@Component({
  selector: 'app-shelters',
  standalone: true,
  imports: [],
  templateUrl: './shelters.component.html',
  styleUrl: './shelters.component.css'
})
export class SheltersComponent {
  pet: PetsListing = {
    id: 0,
    name: '',
    age: 0,
    type: '',
    gender: '',
    behavior: [],
    city: '',
    postDate: new Date(),
    photo: ''
  };

  constructor(private petDataService: PetDataService) {}

  onSubmit(): void {
    this.pet.id = Date.now();
    this.petDataService.addPet(this.pet);
    this.pet = { ...this.pet, id: 0, name: '', age: 0, type: '', gender: '', behavior: [], city: '', photo: ''};
  }
}
