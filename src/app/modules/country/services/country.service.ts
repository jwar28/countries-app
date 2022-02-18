import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Country } from "../models/country";

@Injectable( {
  providedIn: 'root'
} )
export class CountryService {
  private _apiUrl: string = 'https://restcountries.com/v3.1';
  regions: string[]       = [ 'africa', 'americas', 'asia', 'europe', 'oceania' ]
  errorExist: boolean     = false;

  get httpParams() {
    return new HttpParams().set( 'fields', 'cioc,name,capital,region,subregion,flags,population,border,area,timezones,independent' );
  }

  constructor( private http: HttpClient ) {
  }

  getCountriesRequest = ( url: string ) => this.http.get<Country[]>( url, {params: this.httpParams} );

  searchCountryByName( term: string ): Observable<Country[]> {
    const url = `${ this._apiUrl }/name/${ term }`;
    return this.getCountriesRequest( url );
  }

  searchCountryByCapital( term: string ): Observable<Country[]> {
    const url = `${ this._apiUrl }/capital/${ term }`;
    return this.getCountriesRequest( url );
  }

  searchCountryByRegion( term: string ): Observable<Country[]> {
    const url = `${ this._apiUrl }/region/${ term }`;
    return this.getCountriesRequest( url );
  }

  getCountryByCode( term: string ): Observable<Country[]> {
    const url = `${ this._apiUrl }/alpha/${ term }`;
    return this.http.get<Country[]>( url );
  }
}
