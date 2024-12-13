import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PetAddService } from '../pet-add.service';
import { response } from 'express';
import { error } from 'console';
import { PetsListing } from '../../models/pets-listing';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-pet-add',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './pet-add.component.html',
  styleUrl: './pet-add.component.css'
})

export class PetAddComponent {
  petForm: FormGroup;
  @Output() petAdded = new EventEmitter<PetsListing>();

  constructor(private petAddService: PetAddService) {
    this.petForm = new FormGroup({
      name: new FormControl(''),
      type: new FormControl(''),
      gender: new FormControl(''),
      age: new FormControl(''),
      race: new FormControl(''),
      photo: new FormControl(''),
      behaviour: new FormControl(''),
      shelterid: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.petForm.invalid)  {
      console.log('Form is invalid');
      return;
    }
    //get pet data from the form
    const newPet: PetsListing = this.petForm.value;

    ///send newPet object to service
    this.petAddService.addPet(newPet).subscribe({
      next: (response) => {
        console.log('Pet added successfully:', response);
        this.petAdded.emit(newPet);
        this.petForm.reset();
      },
      error: (err) => {
        console.error('Error adding pet:', error);
      }
    });

    //if (!newPet.shelterid) {
    //  console.log('Shelter ID is missing');
    //  return;
    //}
  }
}

  /*onSubmit(): void {
    if (this.petForm.valid) {
      const formData = form.value;

      const newPet: PetsListing = {
        petid: Math.floor(Math.random() * 1000000),
        date_added: new Date(),
        name: formData.name,
        gender: formData.gender,
        age: formData.age,
        type: formData.type,
        race: formData.race,
        photo: formData.photo,
        shelterid: 1,
        behavior: ["lazy"]
      };

      console.log(newPet);

      ///send newPet object to service
      this.petAddService.addPet(newPet).subscribe({
        next: (response) => {
          console.log('Pet added successfully:', response);
          this.petAdded.emit(newPet);
          form.resetForm();
        },
        error: (error) => {
          console.error('Error adding pet:', error);
        }
      });
    }
  }*/

