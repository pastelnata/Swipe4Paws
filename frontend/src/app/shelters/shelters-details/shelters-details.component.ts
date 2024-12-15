import { Component } from '@angular/core';
import { SheltersService } from '../shelters.service';
import { SheltersListing } from '../../models/shelters-listing';
@Component({
  selector: 'app-shelters-details',
  standalone: true,
  imports: [],
  templateUrl: './shelters-details.component.html',
  styleUrl: './shelters-details.component.css'
})

export class SheltersDetailsComponent {

  currentShelter: SheltersListing = {
    shelterid: 0,
    email: '',
    name: '',
    password: '',
    address: '',
    city: '',
    postal_code: 0,
    status: '',
    photo: '',
    description: '',

  };

  constructor( private shelterService: SheltersService) {
    this.displayShelter();
  }

  displayShelter(){
    const url = new URL(window.location.href);
    const id = url.pathname.split('/').pop();
    if(id){
      this.getShelterById(parseInt(id));
    }else{
      console.log("Id not found!");
    }
    
  }

  getShelterById(shelterId:number){
    console.log("Id received" + shelterId);
    this.shelterService.getShelterById(shelterId).subscribe((shelter: SheltersListing) => this.currentShelter = shelter );
    
  }
}
