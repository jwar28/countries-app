import { Component, Input } from '@angular/core';
import { Country } from "../../models/country";

@Component( {
  selector   : 'app-country-table',
  templateUrl: './country-table.component.html',
} )
export class CountryTableComponent {
  @Input() countries: Country[] = [];
}
