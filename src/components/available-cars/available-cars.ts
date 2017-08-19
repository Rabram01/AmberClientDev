import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { } from '@types/google-maps';
import { CarProvider } from '../../providers/car/car';
import * as SlidingMarker from 'marker-animate-unobtrusive';

@Component({
  selector: 'available-cars',
  templateUrl: 'available-cars.html'
})
export class AvailableCarsComponent implements OnInit {
  @Input() map: google.maps.Map;
  @Input() isPickupRequested: boolean;

  public carMarkers: Array<google.maps.Marker>;

  constructor(public carService: CarProvider) {
    this.carMarkers = [];
  }

  ngOnInit() {
    console.log("IN INIT")
    this.fetchAndRefresh();
  }

  ngOnChanges() {
    if (this.isPickupRequested) {
      this.removeCarMarkers();
    }
  }
  removeCarMarkers() {
    let numOfCars = this.carMarkers.length;
    while (numOfCars--) {
      let car = this.carMarkers.pop();
      car.setMap(null);
    }
  }
  addCarMarker(car) {
    let carMarker = new SlidingMarker({
      map: this.map,
      position: new google.maps.LatLng(car.coord.lat, car.coord.lng),
      icon: 'img/car.png'
    });

    carMarker.setDuration(2000);
    carMarker.setEasing('linear');

    carMarker.set('id', car.id); // MVCObject()

    this.carMarkers.push(carMarker);
  }

  updateCarMarker(car) {
    for (var i = 0, numOfCars = this.carMarkers.length; i < numOfCars; i++) {
      // find car and update it
      if ((<any>this.carMarkers[i]).id === (<any>car).id) {
        this.carMarkers[i].setPosition(new google.maps.LatLng(car.coord.lat, car.coord.lng));
        return;
      }
    }
    // car does not exist in carMarkers
    this.addCarMarker(car);
  }

  fetchAndRefresh() {
    this.carService.getCars(46.209980, 6.135784)
      .subscribe(carsData => {
        if (!this.isPickupRequested) {
          (<any>carsData).cars.forEach(car => {
            //console.log(car)
            this.updateCarMarker(car);
          })
        }
      })
  }

}
