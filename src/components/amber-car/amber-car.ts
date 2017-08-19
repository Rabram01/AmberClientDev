import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CarProvider } from '../../providers/car/car';
import { } from '@types/google-maps';

@Component({
  selector: 'amber-car',
  templateUrl: 'amber-car.html'
})
export class AmberCarComponent implements OnInit, OnChanges {
  @Input() map: google.maps.Map;
  @Input() isPickupRequested: boolean;
  @Input() pickUpcurrentLoc: google.maps.LatLng;

  constructor(public carService: CarProvider) {
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  ngOnChanges() {
    if (this.isPickupRequested) {
      this.requestCar();
    } else {
      this.removeCarReq();
    }

  }

  requestCar() {

    console.log('ENCULEEEEEEERRRR' + this.pickUpcurrentLoc);
   /* this.carService.findCar(this.pickUpcurrentLoc)
    .subscribe(car =>{

    })*/
  }

  removeCarReq() {

  }

}
