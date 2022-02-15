import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: []
})
export class ByCountryComponent {
  term: string = '';

  search() {
    console.log(this.term)
    this.term = '';
  }
}
