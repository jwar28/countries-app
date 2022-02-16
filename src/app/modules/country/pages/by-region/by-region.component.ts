import { Component } from '@angular/core';
import { Country } from "../../models/country";
import { CountryService } from "../../services/country.service";

@Component( {
  selector   : 'app-by-region',
  templateUrl: './by-region.component.html',
  styles     : []
} )
export class ByRegionComponent {
  errorExist: boolean  = false;
  countries: Country[] = [];

  constructor( private countryService: CountryService ) {
  }

  searchCountryByRegion( term: string ) {
    this.errorExist = false;
    this.countryService.searchCountryByRegion( term )
        .subscribe( ( countries ) => {
          this.countries = countries;
        }, ( err ) => {
          this.errorExist = true;
          this.countries  = [];
        } )
  }

  suggest( term: string ) {

  }
}
