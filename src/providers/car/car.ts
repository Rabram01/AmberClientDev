import { DataCarsProvider } from './../data-cars/data-cars';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class CarProvider {
  public dataCars: DataCarsProvider;


  constructor() {
    this.dataCars = new DataCarsProvider();
  }

  getCars(lat, lng) {
    return Observable
      .interval(2000)
      .switchMap(() => this.dataCars.getCars(lat, lng)
      ).share();
  }

  findCar(currentLoc) {
    return this.dataCars.findCar(currentLoc);
  }

  getCarPickup(){
    return this.dataCars.getPickupcar();
  }

  pollForRiderPickup(){
    return this.dataCars.riderPickupCar();
  }

  pollForRiderDropOff() {
    return this.dataCars.riderDroppedOff();
  }

  dropoffCar(pickupLocation, dropoffLocation) {
    return this.dataCars.dropoffPickupCar(pickupLocation, dropoffLocation);
  }

}
