import { Component, Input } from '@angular/core';
import { Country } from "../../models/country";

@Component( {
  selector   : 'app-country-suggestion',
  templateUrl: './country-suggestion.component.html',
  styles     : []
} )
export class CountrySuggestionComponent {
  @Input() suggestedCountries: Country[] = [];
}
