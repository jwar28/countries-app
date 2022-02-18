import { Component } from '@angular/core';

@Component( {
  selector   : 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles     : [
    `
        h2 {
            text-align: center;
        }

        li {
            cursor: pointer;
        }
    `
  ]
} )
export class SidebarComponent {

}
