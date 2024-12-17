import { Injectable } from '@angular/core';
import { PetsListing } from '../models/pets-listing';
import { PetsListingModuleModule } from '../pets-listing/pets-listing.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PetsDetailsService {

  constructor(private http: HttpClient,) { }

  baseURL = 'http://localhost:3000/pets';

    getPetById(id: number): Observable<PetsListing> {
      return this.http.get<PetsListing>(this.baseURL+ '/' + id)
    }
}
