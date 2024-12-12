import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PetsListing } from '../models/pets-listing';
import { Observable, tap } from 'rxjs';
import { HomeService } from '../home/home.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  searchPets(query: string): Observable<PetsListing[]> {
    return this.http.get<PetsListing[]>(`${this.apiUrl}/pets/search?q=${query}`).pipe(
      tap((pets) => {
        if (pets.length === 0) {
          alert('No pets found');
        }
        this.router.navigateByUrl('adopt/pets');
      })
    );
  }
}
