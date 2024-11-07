import { Component, ElementRef, OnInit, ViewChild, viewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsListingComponent } from '../../pets-listing/pets-listing.component';
import { PetsListing } from '../../models/pets-listing';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { HomeService } from '../home.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PetsListingComponent,
    MatSelectModule,
    MatExpansionModule,
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  petsListingList: PetsListing[] = [];
  showFilterOptions: boolean = false;
  nameFilter: string = '';
  typeFilter: string = '';
  genderFilter: string = '';
  sortOrder: string = '';
  currentFilters: string[] = [];
  //we need a validation here so it cant be longer than 20 characters
  currentOptions: string[] = [];

  selectFiltersForm = new FormGroup({
    color: new FormControl(''),
  });

  ngOnInit(): void {
    this.selectFiltersForm = new FormGroup({
      color: new FormControl(''),
    });
  }

  constructor(private homeService: HomeService) {
    this.loadListData();
    this.currentOptions = this.getAllTheOptions();
  }


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


  //Create html object filters

  getAllTheOptions() {
    return this.homeService.getAllTheOptions();
  }

  onSubmit() {
    const selectedOption = this.selectFiltersForm.get('color')?.value;
    if (selectedOption) {
      if(!document.querySelector('#'+selectedOption)){
        //create button
        const buttonElement: HTMLButtonElement = document.createElement('button');
        //Add contnet
        buttonElement.textContent = selectedOption + ' X';
        //add id
        buttonElement.id = selectedOption;
        buttonElement.classList.add('filter-select-button');
        buttonElement.style.display = 'flex';

        //Applies styles manualy becouse class does not work for some reson
        this.ApplyStyles(buttonElement);
        
        //add onclick event
        buttonElement.addEventListener('click', () => {
          this.removeFilter(selectedOption);
        });
        //adds element to the .currnt-filters class element
        const currentFiltersDiv: HTMLDivElement = document.querySelector('.current-filters') as HTMLDivElement;
        currentFiltersDiv.appendChild(buttonElement);
        //push it to the current filters list and apply filters
        this.currentFilters.push(selectedOption);
        //Disables the alredy added option
        this.currentOptions.splice(this.currentOptions.indexOf(selectedOption), 1);
        this.applyFilters();
        //resets the form
        this.selectFiltersForm.reset();
      }
      else{
        console.log('Already added!');
      }


    }
  }


  ApplyStyles ( buttonElement: HTMLButtonElement){ 
    buttonElement.style.display = 'flex';
    buttonElement.style.flexDirection = 'row';
    buttonElement.style.textAlign = 'center';
    buttonElement.style.alignItems = 'center';
    buttonElement.style.backgroundColor = 'rgb(255, 255, 255)';
    buttonElement.style.border = '1px solid rgb(86, 125, 99)';
    buttonElement.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
    buttonElement.style.borderRadius = '10px';
    buttonElement.style.padding = '5px';
    buttonElement.style.maxHeight = '30px';
    buttonElement.style.minWidth = 'fit-content';
    buttonElement.style.maxWidth = 'max-content';

  }
  
  //removes filter and apply filters
  removeFilter(id: string): void {
    const elementToDelete: HTMLElement = document.getElementById(id) as HTMLElement;
    elementToDelete.remove();
    this.currentFilters = this.currentFilters.filter(filter => filter !== id);
    this.applyFilters();
    this.currentOptions.push(id);
  }

  loadListData(){
    this.petsListingList = this.homeService.getList();
  }

  toggleFilterOptions() {
    this.showFilterOptions = !this.showFilterOptions;
  }

  applyFilters() {
    this.homeService.setFilters(this.nameFilter, this.typeFilter, this.genderFilter, this.currentFilters);
    this.loadListData();
  }

  resetFilters() {
    this.nameFilter = '';
    this.typeFilter = '';
    this.genderFilter = '';
    this.homeService.resetFilters();
    this.loadListData();
  }

  filterByType(type: string) {
    // this.homeService.filterByType(type);
    this.loadListData();
    this.typeFilter = type;
    this.applyFilters();
  }

  filterByGender(gender: string) {
    this.genderFilter = gender;
    this.applyFilters();
  }

  //Sorting
  sortBy(sortValue: string) {
    this.sortOrder = sortValue;
    if(this.sortOrder === "AZpets"){
      this.petsListingList.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }else if(this.sortOrder === "ZApets"){
      this.petsListingList.sort(function (a, b) {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      });
    }else if(this.sortOrder === "NewOldDate"){
      this.petsListingList.sort(function (a, b) {
        if (a.postDate < b.postDate) {
          return 1;
        }
        if (a.postDate > b.postDate) {
          return -1;
        }
        return 0;
      })

    }else if(this.sortOrder === "OldNewDate") {
      this.petsListingList.sort(function (a, b) {
        if (a.postDate < b.postDate) {
          return -1;
        }
        if (a.postDate > b.postDate) {
          return 1;
        }
        return 0;
      })
    }
    else if(this.sortOrder === "none"){
      this.loadListData();
    }
  }
}
