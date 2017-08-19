import { Observable } from 'rxjs/Observable';
import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { CarProvider } from '../../providers/car/car';
import { LoadingController, NavController } from 'ionic-angular';
import { MeMarkerComponent } from '../me-marker/me-marker';
import { AvailableCarsComponent } from '../available-cars/available-cars';
import { AmberCarComponent } from '../amber-car/amber-car';
import { } from '@types/google-maps';


@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements OnInit {
  @Input() isPickupRequested: boolean;


  public map: google.maps.Map;
  public isMapIdle: boolean;
  public currentLoc: google.maps.LatLng;

  constructor(private geolocation: Geolocation) {
  }
  ngOnInit() {
    this.map = this.creatMap()
    this.mapEventListner();

    this.getCurentPos().subscribe(location => {
      this.centerloc(location);

    })
  }

  updateCurrentLoc(location){
    this.currentLoc = location;
    this.centerloc(location);
  }

  mapEventListner() {

    google.maps.event.addListener(this.map, 'dragstart', () => {
      this.isMapIdle = false;
      //console.log('isMapIdle :' + this.isMapIdle);
    })
    google.maps.event.addListener(this.map, 'idle', () => {
      this.isMapIdle = true;
      //console.log('isMapIdle :' + this.isMapIdle);
    })
  }

  getCurentPos() {
    let options = { timeout: 10000, enableHighAccuracy: true };

    let locObs = Observable.create(observable => {
      this.geolocation.getCurrentPosition(options)
        .then(resp => {
          let lat = resp.coords.latitude;
          let long = resp.coords.longitude;

          let location = new google.maps.LatLng(lat, long);

          observable.next(location);
        },
        (err) => {
          console.log(err);
        });
    });
    return locObs;
  }

  creatMap(location = new google.maps.LatLng(40.712784, -74.005941)) {
    //let loc = new google.maps.LatLng(40.712784, -74.005941);
    let mapOptions = {
      center: location,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let mapEl = document.getElementById('map');
    let map = new google.maps.Map(mapEl, mapOptions);

    return map;
  }

  centerloc(location) {
    if (location) {
      this.map.panTo(location);
    }
    else {

      this.getCurentPos().subscribe(currentLocation => {
        this.map.panTo(currentLocation);
      });
    }
  }



}
