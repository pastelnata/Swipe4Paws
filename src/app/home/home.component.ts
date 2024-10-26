import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsListingComponent } from '../pets-listing/pets-listing.component';
import { PetsListing } from '../pets-listing';

declare function showButtons(): void;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PetsListingComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent {
  petsListingList: PetsListing[] = [
    {
      "id": 1,
      "name": "kicia",
      "gender": "Female",
      "age": 2,
      "type": "cat",
      "city": "Odense",
      "photo": "/assets/kitty1.jpg",
    },
    {
      "id": 2,
      "name": "Pawel",
      "gender": "Male",
      "age": 3,
      "type": "dog",
      "city": "Sonderborg",
      "photo": "/assets/kitty1.jpg",
    },
    {
      "id": 3,
      "name": "miau",
      "gender": "Female",
      "age": 6,
      "type": "dog",
      "city": "Sonderborg",
      "photo": "/assets/kitty1.jpg", 
    },
    {
      "id": 4,
      "name": "Pusia",
      "gender": "Male",
      "age": 1,
      "type": "cat",
      "city": "Sonderborg",
      "photo": "/assets/kitty1.jpg",
    }
  ];

  filteredPetsList: PetsListing[] = [];

  //Boolean contrioling visibility of buttons
  showFilterOptions: boolean = false;

  // Filter criteria
  nameFilter: string = '';
  typeFilter: string = '';
  genderFilter: string = '';
  
  constructor() {
    this.filteredPetsList = this.petsListingList; 
  }

  /* CHANGE VIDEO BACKGROUND METHODS */
  @ViewChild('dogVideo') dogVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('catVideo') catVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('otherVideo') otherVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('backgroundPic') backgroundPic!: ElementRef<HTMLPictureElement>;

  hideallVideos() {
    this.dogVideo.nativeElement.classList.remove('show');
    this.catVideo.nativeElement.classList.remove('show');
    this.otherVideo.nativeElement.classList.remove('show');
    this.backgroundPic.nativeElement.classList.add('show');

    this.dogVideo.nativeElement.pause();
    this.catVideo.nativeElement.pause();
    this.otherVideo.nativeElement.pause();
  }

  playVideo(animalButton: 'dog' | 'cat' | 'other') {
    this.hideallVideos();

    const video = {
      dog: this.dogVideo,
      cat: this.catVideo,
      other: this.otherVideo,
    }
    const selectedVideo = video[animalButton];

    selectedVideo.nativeElement.classList.add('show');
    selectedVideo.nativeElement.muted = true;
    selectedVideo.nativeElement.play();
  }

  pauseVideo(animal: 'dog' | 'cat' | 'other'): void {
    const videoMap = {
      dog: this.dogVideo,
      cat: this.catVideo,
      other: this.otherVideo,
    };

    const selectedVideo = videoMap[animal];
    selectedVideo.nativeElement.pause();
    selectedVideo.nativeElement.classList.remove('show');
    this.backgroundPic.nativeElement.classList.add('show');
  }

  
  /* FILTER METHODS */

  //Function that is called upon clicking button Filter
  //Changes visibility of filteroptions
  toggleFilterOptions() {
    this.showFilterOptions = !this.showFilterOptions;
  }


  applyFilters() {
    this.filteredPetsList = this.petsListingList.filter(pet => {
      const matchesName = pet.name.toLowerCase().includes(this.nameFilter.toLowerCase());
      const matchesType = this.typeFilter ? pet.type.toLowerCase() === this.typeFilter.toLowerCase() : true;
      const matchesGender = this.genderFilter ? pet.gender.toLowerCase() === this.genderFilter.toLowerCase() : true;
      return matchesName && matchesType && matchesGender;
    });
  }
  
  filterResults(name: string) {
    this.nameFilter = name;  
    this.applyFilters();     
  }

  filterByType(type: string) {
    this.typeFilter = type;  
    this.applyFilters();     
  }

  filterByGender(gender: string) {
    this.genderFilter = gender;  
    this.applyFilters();         
  }

  resetFilters() {
    this.nameFilter = '';
    this.typeFilter = '';
    this.genderFilter = '';
    this.filteredPetsList = this.petsListingList; 
  }
}
