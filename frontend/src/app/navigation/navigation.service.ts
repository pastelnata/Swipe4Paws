import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PetsListing } from '../models/pets-listing';
import { Observable, tap } from 'rxjs';
import { HomeService } from '../home/home.service';


@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private homeService: HomeService) {}
  scrollToSection() {
    this.homeService.scrollToSection('Filter-Buttons');
  }
}
