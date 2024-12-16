import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FavoriteModel } from '../models/FavoriteModel';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  constructor(private http: HttpClient) { }


  addFavourite(petId: number, userId: number): Observable<any> {
    console.log(`Adding to favourites: petid ${petId}, userid ${userId}`);

    return this.http.post('http://localhost:3000/favorites/add', { petId, userId });
  }

  deleteFavourite(petId: number, userId: number): Observable<any> {
    return this.http.delete('http://localhost:3000/favorites/delete', { body: { petId, userId } });
  }

  getAllFavourites(): Observable<any> {
    return this.http.get<FavoriteModel[]>('http://localhost:3000/favorites/get');
  }

  toggleFavourite(petId: number, userId: number, isLiked: Boolean): Observable<any> {
    if (isLiked) {
      return this.deleteFavourite(petId, userId);
    } else {
      return this.addFavourite(petId, userId);
    }
  }
}
