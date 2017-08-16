import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import {} from '@types/google-maps';
declare var google: any;
@Component({
  selector: 'me-marker',
  templateUrl: 'me-marker.html'
})
export class MeMarkerComponent implements OnChanges {
  @Input() isPickupRequested: boolean;
  @Input() isPinSet: boolean;
  @Input() map: any;
  //@Output() updatedPickupLocation: EventEmitter<google.maps.LatLng> = new EventEmitter<google.maps.LatLng>();
  private meMarker: google.maps.Marker = null;
  private popup: any;
  constructor() {
    
  }

  ngOnChanges(changes) {
    console.log(changes);
    //console.log(this.isPinSet);
    if (!this.isPickupRequested) {
      if (this.isPinSet) {
        this.showMeMarker();
      } else {
        this.removeMeMarker();
      }
    }
  }

  showMeMarker() {
    this.removeMeMarker();
    this.meMarker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      position: this.map.getCenter(),
      icon: 'img/map-marker.png'
    })
    setTimeout(() => {
      this.meMarker.setAnimation(null)
    }, 750);
    this.showPickupTime();
    console.log(this.meMarker.getPosition())
  }

  removeMeMarker() {
    if (this.meMarker) {
      this.meMarker.setMap(null);
      this.meMarker = null;
    }
  }

  showPickupTime() {
    this.popup = new google.maps.InfoWindow({
      content: '<h5>You Are Here</h5>'
    });

    this.popup.open(this.map, this.meMarker);

    google.maps.event.addListener(this.meMarker, 'click', () => {
      this.popup.open(this.map, this.meMarker);
    });
  }
}
