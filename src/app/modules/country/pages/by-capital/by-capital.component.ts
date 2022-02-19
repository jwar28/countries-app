import { Component } from '@angular/core';
import { Country } from "../../models/country";
import { CountryService } from "../../services/country.service";

@Component( {
  selector   : 'app-by-capital',
  templateUrl: './by-capital.component.html',
  styles     : []
} )
export class ByCapitalComponent {
  errorExist: boolean           = false;
  countries: Country[]          = [];
  suggestedCountries: Country[] = [];

  constructor( private countryService: CountryService ) {
  }

  searchCountryByCapital( term: string ) {
    this.errorExist = false;
    this.countryService.searchCountryByCapital( term )
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

    this.countryService.searchCountryByCapital( term )
        .subscribe( countries => this.suggestedCountries = countries.splice( 0, 3 ),
          error => {
            term === ''
            ? this.suggestedCountries = []
            : (this.errorExist = true) && (this.suggestedCountries = []);
          }
        );
  }
}
