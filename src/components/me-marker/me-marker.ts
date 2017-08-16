import { Component } from '@angular/core';

/**
 * Generated class for the MeMarkerComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'me-marker',
  templateUrl: 'me-marker.html'
})
export class MeMarkerComponent {

  text: string;

  constructor() {
    console.log('Hello MeMarkerComponent Component');
    this.text = 'Hello World';
  }

}
