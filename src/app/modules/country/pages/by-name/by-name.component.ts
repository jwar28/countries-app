import { Component, OnInit } from '@angular/core';
import { CountryService } from "../../services/country.service";
import { Country } from "../../models/country";

@Component( {
  selector   : 'app-by-name',
  templateUrl: './by-name.component.html',
  styles     : []
} )
export class ByNameComponent implements OnInit {
  errorExist: boolean           = false;
  countries: Country[]          = [];
  suggestedCountries: Country[] = [];

  constructor( private countryService: CountryService ) {
  }

  ngOnInit() {
    this.countryService.getAllCountries()
        .subscribe( countries => this.countries = countries );
  }

  searchCountryByName( term: string ) {
    this.errorExist = false;
    this.countryService.searchCountryByName( term )
        .subscribe( ( countries ) => {
          this.countries          = countries;
          this.suggestedCountries = [];
        }, error => {
          this.errorExist = true;
          this.countries  = [];
        } )
  }

  suggestCountry( term: string ) {
    this.errorExist = false;

    this.countryService.searchCountryByName( term )
        .subscribe( countries => this.suggestedCountries = countries.splice( 0, 3 ),
          error => {
            term === ''
            ? this.suggestedCountries = []
            : (this.errorExist = true) && (this.suggestedCountries = []);
          }
        );
  }
}
