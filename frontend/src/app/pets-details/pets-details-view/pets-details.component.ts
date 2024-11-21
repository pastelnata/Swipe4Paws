import { Component, Input, OnInit } from '@angular/core';
import { PetsListingComponent } from '../../pets-listing/pets-listing-view/pets-listing.component';
import { PetsListing } from '../../models/pets-listing';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../home/home.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pets-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pets-details.component.html',
  styleUrl: './pets-details.component.css'
})
export class PetsDetailsComponent implements OnInit {
  @Input() petsListing!:PetsListing;
  public petsListingList: PetsListing[] = [];
  private currentPetIndex: number = 0;
  constructor (
    private homeService: HomeService, 
    private route: ActivatedRoute) {
    this.loadListData();
    }
  ngOnInit(): void {
    const index = this.route.snapshot.paramMap.get('index');
    console.log("index:" + index);
    console.log("PetsListing inside details:")
    console.log(this.petsListing);
    this.currentPetIndex = this.getCurrentPetIndex();
    this.loadCurrentPetData(this.currentPetIndex);
    
  }

  getCurrentPetIndex(): number {
    const index = this.route.snapshot.paramMap.get('id');
    console.log("index inside getCurrentPetIndex:" + index);
    return Number(index);
  }

  loadListData(): void {
    this.homeService.getList().subscribe((filteredPetsList: PetsListing[]) => {
      this.petsListingList = filteredPetsList;
      console.log(this.petsListingList);
    });
  }

  loadCurrentPetData(index: number): void {
    this.petsListing = this.petsListingList.find(pet => pet.petid === index)!;
  }



} 
