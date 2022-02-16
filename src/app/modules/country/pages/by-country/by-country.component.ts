import { Component } from '@angular/core';
import { CountryService } from "../../services/country.service";
import { Country } from "../../models/country";

@Component( {
  selector   : 'app-by-country',
  templateUrl: './by-country.component.html',
  styles     : []
} )
export class ByCountryComponent {
  errorExist: boolean  = false;
  countries: Country[] = [];
  title: string        = "name";

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
