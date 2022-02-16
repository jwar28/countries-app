import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from "rxjs";

@Component( {
  selector   : 'app-country-input',
  templateUrl: './country-input.component.html',
} )
export class CountryInputComponent implements OnInit {
  @Output() onEnter: EventEmitter<string>    = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Input() placeholder: string               = "";

  debouncer: Subject<string> = new Subject();
  term: string               = ""

  ngOnInit() {
    this.debouncer
        .pipe(
          debounceTime( 300 )
        )
        .subscribe( value => {
          this.onDebounce.emit( value )
        } )
  }

  search() {
    this.onEnter
        .emit( this.term );
  }

  keyPressed( $event: any ) {
    this.debouncer
        .next( this.term );
  }
}
