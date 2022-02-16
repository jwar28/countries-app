import { Component } from '@angular/core';

@Component( {
  selector   : 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles     : [
    `
        li {
            cursor: pointer;
        }
    `
  ]
} )
export class SidebarComponent {

}
