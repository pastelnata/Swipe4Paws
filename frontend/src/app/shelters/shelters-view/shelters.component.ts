import { Component } from '@angular/core';
import { SheltersService } from '../shelters.service';
import { SheltersModule } from '../shelters.module';
import { SheltersListing } from '../../models/shelters-listing';
import { CommonModule } from '@angular/common';
// import { HomeService } from '../../home/home.service';
@Component({
  selector: 'app-shelters',
  standalone: true,
  imports: [CommonModule, SheltersModule],
  templateUrl: './shelters.component.html',
  styleUrl: './shelters.component.css'
})
export class SheltersComponent {

  sheltersList: SheltersListing[] = [];
  
  constructor(private shelterService: SheltersService) {}

  ngOnInit() {
    // call to service to get all the pets
    this.loadSheltersList();
    this.returnAprovedShelters();
  }

  loadSheltersList(){
    this.shelterService.getAllShelters().subscribe((shelters: SheltersListing[]) => {
      this.sheltersList = shelters;
      console.log(this.sheltersList);
    }, (error) => {
      console.error('Error loading shelters:', error);
    });
  }

  returnAprovedShelters(): SheltersListing[] {
    return this.sheltersList.filter(shelter => this.checkApproved(shelter));
  }

  //check if the shelter is approved
  checkApproved(shelter: SheltersListing): boolean {
    return shelter.status === 'Approved';
  }

  //Redirect to shelter details
  displayShelterDetails(index: number){
    const shelter = this.sheltersList[index];
    window.location.replace(`http://localhost:4200/shelters/${shelter.shelterid}`);
  }


}
