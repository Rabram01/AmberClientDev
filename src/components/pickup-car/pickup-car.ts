import { Component } from '@angular/core';

/**
 * Generated class for the PickupCarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'pickup-car',
  templateUrl: 'pickup-car.html'
})
export class PickupCarComponent {

  text: string;

  constructor() {
    console.log('Hello PickupCarComponent Component');
    this.text = 'Hello World';
  }

}
