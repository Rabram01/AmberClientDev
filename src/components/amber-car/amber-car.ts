import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CarProvider } from '../../providers/car/car';
import { } from '@types/google-maps';
import * as SlidingMarker from 'marker-animate-unobtrusive';
import { PickupPubSubProvider } from '../../providers/pickup-pub-sub/pickup-pub-sub';

@Component({
  selector: 'amber-car',
  templateUrl: 'amber-car.html'
})
export class AmberCarComponent implements OnInit, OnChanges {
  @Input() map: google.maps.Map;
  @Input() isPickupRequested: boolean;
  @Input() pickUpcurrentLoc: google.maps.LatLng;
  @Input() destination: string;
  public pickupCarMarker: any;
  public polyLine: google.maps.Polyline;

  constructor(public carService: CarProvider, private pickupSub: PickupPubSubProvider) {
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  ngOnChanges() {
    if (this.destination) {
      this.dropoffCar();
    } else {
      if (this.isPickupRequested) {
        this.requestCar();
      } else {
        this.removeCarReq();
        this.removeDirections();
      }
    }

  }
  addCarMarker(carPos) {

    console.log(carPos);
    this.pickupCarMarker = new SlidingMarker({
      map: this.map,
      position: carPos,
      icon: 'img/car.png'
    });
    this.pickupCarMarker.setDuration(1000);
    this.pickupCarMarker.setEasing('linear');

  }

  showDirectionPath(path) {
    this.polyLine = new google.maps.Polyline({
      path: path,
      strokeColor: '#FF0000',
      strokeWeight: 3
    });
    this.polyLine.setMap(this.map);
  }

  updatCar(cbDone) {
    this.carService.getCarPickup().subscribe(car => {
      this.pickupCarMarker.setPosition(car.position);
      this.polyLine.setPath(car.path);
      this.pickupSub.emitArrivalTime(car.time);
      if (car.path.length > 1) {
        setTimeout(() => {
          this.updatCar(cbDone);
        }, 1000)
      } else {
        cbDone();
      }
    });
  }
  dropoffCar() {
    this.carService.dropoffCar(this.pickUpcurrentLoc, this.destination)
      .subscribe( car => {
        // keep updating car
        this.updatCar( ()=> this.checkForRiderDropoff() );
      })
  }
  checkForRiderDropoff(){
    this.carService.pollForRiderDropOff().subscribe(data => {
      this.pickupSub.emitDropOff();
    })
  }

  requestCar() {

    //console.log('ENCULEEEEEEERRRR' + this.pickUpcurrentLoc);
    this.carService.findCar(this.pickUpcurrentLoc)
      .subscribe(car => {
        this.addCarMarker(car.position);
        this.showDirectionPath(car.path);
        this.updatCar(() => this.checkForRiderPickup());
      })
  }
  checkForRiderPickup() {
    this.carService.pollForRiderPickup().subscribe(data => {
      this.pickupSub.emitPickup();
    })
  }

  removeCarReq() {
    if (this.pickupCarMarker) {
      this.pickupCarMarker.setMap(null);
      this.pickupCarMarker = null;
    }
  }
  removeDirections() {
    if (this.polyLine) {
      this.polyLine.setMap(null);
      this.polyLine = null;
    }
  }

}
