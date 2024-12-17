import { Component, Input, OnInit } from '@angular/core';
import { PetsListingComponent } from '../../pets-listing/pets-listing-view/pets-listing.component';
import { PetsListing } from '../../models/pets-listing';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../home/home.service';
import { ActivatedRoute } from '@angular/router';
import { PetsDetailsService } from '../pets-details.service';
@Component({
  selector: 'app-pets-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pets-details.component.html',
  styleUrl: './pets-details.component.css'
})
export class PetsDetailsComponent implements OnInit {
  @Input() petsListing!:PetsListing;

    constructor( private petService: PetsDetailsService) {
      this.displayPet();
    }
  ngOnInit(): void {
    
    
  }

  currentPet: PetsListing = {
    petid: 0,
    date_added: new Date(), 
    name: '',
    gender: '',
    age: 0,
    type: '',
    race: '',
    behaviors: [],
    photo: '',
    shelterid: 0,
    description: ''
  };
  
    displayPet(){
      const url = new URL(window.location.href);
      const id = url.pathname.split('/').pop();
      if(id){
        this.getPetById(parseInt(id));
      }else{
        console.log("Id not found!");
      }
  
    }
  
    getPetById(petId:number){
      console.log("Id received" + petId);
      this.petService.getPetById(petId).subscribe((pet: PetsListing) => this.currentPet = pet );
  
    }





} 
