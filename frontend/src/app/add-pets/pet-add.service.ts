import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetsListing } from '../models/pets-listing';

@Injectable({
  providedIn: 'root'
})
export class PetAddService {

  private apiURL = 'http://localhost:3000/pets';

  constructor(private http: HttpClient) { }

  addPet(newPet: PetsListing): Observable<PetsListing> {
    return this.http.post<PetsListing>(this.apiURL, newPet);
  }
}
