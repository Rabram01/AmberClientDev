import { Observable } from 'rxjs/Observable';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
//import { Observable } from 'rxjs/Rx';
import { LoadingController, NavController } from 'ionic-angular';
//import {googlemaps} from '@types/googlemaps';
import {MeMarkerComponent} from '../me-marker/me-marker';
declare var google;


@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements OnInit {

  public map: any;
  constructor(private geolocation: Geolocation) {
  }
  ngOnInit() {
    this.map = this.creatMap()
    this.getCurentPos().subscribe(location => {
      this.centerloc(location);
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
    let loc = new google.maps.LatLng(40.712784, -74.005941);
    let mapOptions = {
      //center: location,
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
