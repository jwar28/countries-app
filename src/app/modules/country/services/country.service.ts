import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Country } from "../models/country";

@Injectable( {
  providedIn: 'root'
} )
export class CountryService {
  private _apiUrl: string = 'https://restcountries.com/v3.1';

  constructor( private http: HttpClient ) {
  }

  getCountriesRequest( url: string ): Observable<Country[]> {
    return this.http.get<Country[]>( url );
  }

  searchCountryByName( term: string ): Observable<Country[]> {
    const url = `${ this._apiUrl }/name/${ term }`;
    return this.getCountriesRequest( url );
  }

  searchCountryByCapital( term: string ): Observable<Country[]> {
    const url = `${ this._apiUrl }/capital/${ term }`;
    return this.http.get<Country[]>( url );
  }

  searchCountryByRegion( term: string ): Observable<Country[]> {
    const url = `${ this._apiUrl }/region/${ term }`;
    return this.http.get<Country[]>( url );
  }
}
