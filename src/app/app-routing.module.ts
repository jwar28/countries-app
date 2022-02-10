import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ByCapitalComponent } from './modules/country/pages/by-capital/by-capital.component';
import { ByCountryComponent } from './modules/country/pages/by-country/by-country.component';
import { ByRegionComponent } from './modules/country/pages/by-region/by-region.component';
import { SeeCountryComponent } from './modules/country/pages/see-country/see-country.component';

const routes: Routes = [
  {
    path: '',
    component: ByCountryComponent,
    pathMatch: 'full'
  },
  {
    path: 'region',
    component: ByRegionComponent,
  },
  {
    path: 'capital',
    component: ByCapitalComponent,
  },
  {
    path: 'pais/:id',
    component: SeeCountryComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
