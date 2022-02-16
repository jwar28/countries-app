import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { SidebarComponent } from './sidebar/sidebar.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule( {
  declarations: [
    SidebarComponent,
    NotFoundComponent
  ],
  imports     : [
    CommonModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    NotFoundComponent
  ]
} )
export class SharedModule {
}
