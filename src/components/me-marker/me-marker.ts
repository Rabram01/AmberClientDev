import { Observable } from 'rxjs/Rx';
import { PickupPubSubProvider } from './../../providers/pickup-pub-sub/pickup-pub-sub';
import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { } from '@types/google-maps';
@Component({
  selector: 'me-marker',
  templateUrl: 'me-marker.html'
})
export class MeMarkerComponent implements OnInit, OnChanges {
  @Input() isPickupRequested: boolean;
  @Input() isPinSet: boolean;
  @Input() map: google.maps.Map;
  @Output() updateCurrentLoc: EventEmitter<google.maps.LatLng> = new EventEmitter<google.maps.LatLng>();
  @Input() destination: string;
  
  private meMarker: google.maps.Marker;
  private popup: google.maps.InfoWindow;
  private pickupSubscription: any;
  constructor(private pickupSub: PickupPubSubProvider) {

  }

  ngOnInit() {
    this.pickupSubscription = this.pickupSub.watch().subscribe(e => {
      if(e.event === this.pickupSub.EVENTS.ARRIVAL_TIME) {
        this.updateTime(e.data);
      }
    })
  }
  updateTime(seconds){
    let minutes = Math.floor(seconds/60);
    this.popup.setContent(`<h5>${minutes} minutes</h5>`)
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
    if (this.destination) {
      this.removeMeMarker();
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
    //console.log(this.meMarker.getPosition())

    this.updateCurrentLoc.next(this.meMarker.getPosition());
    console.log(this.meMarker.getPosition());
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
