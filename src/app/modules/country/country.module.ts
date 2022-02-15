import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";

import {ByCapitalComponent} from './pages/by-capital/by-capital.component';
import {ByCountryComponent} from './pages/by-country/by-country.component';
import {ByRegionComponent} from './pages/by-region/by-region.component';
import {SeeCountryComponent} from './pages/see-country/see-country.component';



@NgModule({
  declarations: [
    ByCapitalComponent,
    ByCountryComponent,
    ByRegionComponent,
    SeeCountryComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ByCapitalComponent,
    ByCountryComponent,
    ByRegionComponent,
    SeeCountryComponent
  ]
})
export class CountryModule {
}
