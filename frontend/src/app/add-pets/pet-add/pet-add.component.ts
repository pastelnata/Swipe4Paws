import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PetAddService } from '../pet-add.service';
import { response } from 'express';
import { error } from 'console';
import { PetsListing } from '../../models/pets-listing';

@Component({
  selector: 'app-pet-add',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './pet-add.component.html',
  styleUrl: './pet-add.component.css'
})
export class PetAddComponent {
  @Output() petAdded = new EventEmitter<any>();

  constructor(private petAddService: PetAddService) {}

  onSubmit(form: any) {
    if (form.valid) {
      const formData = form.value;

      const newPet: PetsListing = {
        petid: Date.now(),
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
          this.petAdded.emit(response);
          form.reset();
        },
        error: (error) => {
          console.error('Error adding pet:', error);
        }
      });
      //const newPet = {
       // ...form.value,
       // date_added: new Date(),
       // shelterid: 1, //replace with actual shelter id as needed.
      //};
    }
  }
  //petAdding() {}
}
