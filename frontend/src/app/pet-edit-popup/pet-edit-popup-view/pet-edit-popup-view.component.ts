import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PetsListing } from '../../models/pets-listing';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ShelterAppService } from '../../shelter-app/shelter-app.service';

@Component({
  selector: 'app-pet-edit-popup-view',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pet-edit-popup-view.component.html',
  styleUrl: './pet-edit-popup-view.component.css'
})
export class PetEditPopupViewComponent implements OnInit {
  ngOnInit(): void {
    this.nonDynamicName = this.petData.name;
  }
  nonDynamicName: string = "";

  @Input() petData: PetsListing = {
    petid: -1,
    date_added: new Date(),
    name: "",
    gender: "",
    age: 0,
    type: "",
    race: "",
    behaviors: [],
    photo: "",
    shelterid: 0,
    description: "",
  };
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  constructor(private http: HttpClient, private shelterAppService: ShelterAppService) {
  }

  apiUrl: string = 'http://localhost:3000/pets/update'

  onSubmit() {
    this.http.put(this.apiUrl, this.petData).subscribe(
      (response) => {
        console.log('Pet updated successfully');
        alert(`${this.petData.name} updated succesfully!`)
        this.onClose();
      },
      (error) => {
        console.error(error);
        alert(`Error updating the pet, please try again.`)
      }
    );
  }
}
