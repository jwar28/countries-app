import { Component } from '@angular/core';
import { CountryService } from "../../services/country.service";
import { Country } from "../../models/country";

@Component( {
  selector   : 'app-by-name',
  templateUrl: './by-name.component.html',
  styles     : []
} )
export class ByNameComponent {
  errorExist: boolean  = false;
  countries: Country[] = [];

  constructor( private countryService: CountryService ) {
  }

  searchCountryByName( term: string ) {
    this.errorExist = false;
    this.countryService.searchCountryByName( term )
        .subscribe( ( countries ) => {
          this.countries = countries;
        }, ( err ) => {
          this.errorExist = true;
          this.countries  = [];
        } )
  }

  suggest( term: string ) {
    this.errorExist = false;

  }
}
