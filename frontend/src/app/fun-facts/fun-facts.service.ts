import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunFactsService {

  constructor(private http: HttpClient) { }

  dogApiUrl: string = 'https://dogapi.dog/api/v2/facts';
  catApiUrl: string = 'https://meowfacts.herokuapp.com';

  getDogFact() : Observable<string> {
    return this.http.get<any>(this.dogApiUrl).pipe(
      map(response => response.data[0].attributes.body)
    );
  }

  getCatFact() : Observable<string> {
    return this.http.get<{data: string[]}>(this.catApiUrl).pipe(
      map(response => response.data[0])
    );
  }
}
