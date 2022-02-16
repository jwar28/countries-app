import { Component, Input } from '@angular/core';

@Component( {
  selector   : 'app-not-found',
  templateUrl: './not-found.component.html',
  styles     : []
} )
export class NotFoundComponent {
  @Input() errorExist: boolean = false;
}
