import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ByCapitalComponent } from './pages/by-capital/by-capital.component';
import { ByNameComponent } from './pages/by-name/by-name.component';
import { ByRegionComponent } from './pages/by-region/by-region.component';
import { SeeCountryComponent } from './pages/see-country/see-country.component';
import { CountryTableComponent } from './components/country-table/country-table.component';
import { CountryInputComponent } from './components/country-input/country-input.component';
import { SharedModule } from "../../shared/shared.module";
import { RegionButtonComponent } from './components/region-button/region-button.component';
import { CountrySuggestionComponent } from './components/country-suggestion/country-suggestion.component';


@NgModule( {
  declarations: [
    ByCapitalComponent,
    ByNameComponent,
    ByRegionComponent,
    SeeCountryComponent,
    CountryTableComponent,
    CountryInputComponent,
    RegionButtonComponent,
    CountrySuggestionComponent,
  ],
  imports     : [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  exports     : [
    ByCapitalComponent,
    ByNameComponent,
    ByRegionComponent,
    SeeCountryComponent
  ]
} )
export class CountryModule {
}
