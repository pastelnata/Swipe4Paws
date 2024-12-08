import { Component, ElementRef, OnInit, ViewChild, viewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsListingComponent } from '../../pets-listing/pets-listing-view/pets-listing.component';
import { PetsListing } from '../../models/pets-listing';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { HomeService } from '../home.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RedirectCommand } from '@angular/router';
import { FavoriteModel } from '../../models/FavoriteModel';
import { FavouritesService } from '../../favourites/favourites.service';
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
  showFilterOptions: boolean = true;
  nameFilter: string = '';
  typeFilter: string = '';
  genderFilter: string = '';
  sortOrder: string = '';
  currentFilters: string[] = [];
  //we need a validation here so it cant be longer than 20 characters
  currentOptions: string[] = [];
  favourites: FavoriteModel[] = [];
  isFavouritesLoaded: boolean = false;

  selectFiltersForm = new FormGroup({
    color: new FormControl(''),
  });


  ngOnInit(): void {
    this.loadListData();
    this.selectFiltersForm = new FormGroup({
      color: new FormControl(''),
    });
    console.log(this.petsListingList);
    
    this.loadFavourites();


  }

  constructor(private homeService: HomeService, private favouritesService: FavouritesService) {
    
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
    //Scroll function 
    scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if(!section) return;
    section.scrollIntoView({ behavior: 'smooth', block: 'start'});
  }

  ///CRUD COMMANDS:
  loadListData(): void {
    this.homeService.getList().subscribe((filteredPetsList: PetsListing[]) => {
      this.petsListingList = filteredPetsList;
      console.log(this.petsListingList);
    });
  }

  displayPetsDetails(index: number): void {
    new RedirectCommand(parseUrl(`petInfo/${index}`));
  }
  
  //removes filter and apply filters
  removeFilter(id: string): void {
    const elementToDelete: HTMLElement = document.getElementById(id) as HTMLElement;
    elementToDelete.remove();
    this.currentFilters = this.currentFilters.filter(filter => filter !== id);
    this.applyFilters();
    this.currentOptions.push(id);
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
        if (a.date_added < b.date_added) {
          return 1;
        }
        if (a.date_added > b.date_added) {
          return -1;
        }
        return 0;
      })

    }else if(this.sortOrder === "OldNewDate") {
      this.petsListingList.sort(function (a, b) {
        if (a.date_added < b.date_added) {
          return -1;
        }
        if (a.date_added > b.date_added) {
          return 1;
        }
        return 0;
      })
    }
    else if(this.sortOrder === "none"){
      this.loadListData();
    }
  }

  loadFavourites() {
    this.favouritesService.getAllFavourites().subscribe(
      (favourites: FavoriteModel[]) => {
        this.favourites = favourites;
        console.log('Favourites loaded successfully:', this.favourites);
        this.isFavouritesLoaded = true;
      },
      (error) => {
        console.error('Error loading favourites:', error);
        this.isFavouritesLoaded = true;
      }
    );
  }


}
function parseUrl(arg0: string): import("@angular/router").UrlTree {
  throw new Error('Function not implemented.');
}

