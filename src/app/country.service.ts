import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from './country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  public apiUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl);
  }

  getLimitedCountries(limit: number = 20): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl).pipe(
      map(countries => countries.slice(0, limit))
    );
  }

  postCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(this.apiUrl, country);
  }
}