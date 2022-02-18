import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component( {
  selector   : 'app-region-button',
  templateUrl: './region-button.component.html',
  styles     : [ `
      .col {
          display: inline-flex;
          justify-content: space-evenly;
      }
  ` ]
} )
export class RegionButtonComponent {
  @Output() onButtonClick: EventEmitter<string> = new EventEmitter();
  @Input() regions: string[]                    = [];

  activeRegion: string = "";

  getCssClass( region: string ): string {
    return region === this.activeRegion
           ? 'btn btn-primary mt-2'
           : 'btn btn-outline-primary mt-2'
  }

  getActiveRegion = ( region: string ) => this.activeRegion = region;

  emitActiveRegion( region: string ) {
    this.getActiveRegion( region )
    this.onButtonClick.emit( this.activeRegion );
  }
}
