import { Component } from '@angular/core';
import {AlertController, NavController } from 'ionic-angular';
import { MapComponent } from '../../components/map/map';
import { Driver } from './../../models/driver';
import { PickupPubSubProvider } from './../../providers/pickup-pub-sub/pickup-pub-sub';
import {DestinationAdressComponent} from '../../components/destination-adress/destination-adress'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public isRiderPickedup: boolean;
  public pickupSubscription: any;
  public timeTillArrival: number;
  public destination: string;
  

  public isPickupRequested: boolean;
  constructor(public navCtrl: NavController, 
    private pickupPubSub : PickupPubSubProvider,
    private alertCtrl: AlertController) {
    this.isPickupRequested = false;
    this.isRiderPickedup = false;
    this.timeTillArrival = 5;
    this.pickupSubscription = this.pickupPubSub.watch().subscribe(e => {
      this.processPickupSubscription(e);
    })

  }

  setDestination(destination){
    this.destination =destination;
  }

  processPickupSubscription(e) {
    switch(e.event) {
      case this.pickupPubSub.EVENTS.ARRIVAL_TIME:
        this.updateArrivalTime(e.data);
        break;
      case this.pickupPubSub.EVENTS.PICKUP:
        this.riderPickedUp();
        break;
      case this.pickupPubSub.EVENTS.DROPOFF:
        this.riderDroppedOff();
        break;
    }
  }
  ionViewDidLoad() {
   /* this.res = this.aFauth.auth.signInWithEmailAndPassword('test@test.ch', 'password');
    this.aFauth.authState.subscribe(data => {
      this.driverListRef$ = this.afDatabase.object('profile');
      this.driverListRef$.subscribe(x => {
        for (var key in x) {
          //console.log(key, x[key]);
          this.result = x[key];
          console.log(this.result.lat);
        }
      });
    });*/
  }

  rateDriver() {
    let prompt = this.alertCtrl.create({
      title: 'Rate Driver',
      message: 'Select a rating for your driver',
      inputs: [{
        type: 'radio',
        label: 'Perfect Sex',
        value: 'perfect_sex',
        checked: true
      },
      {
        type: 'radio',
        label: 'Okay c était par derrière',
        value: 'okay'
      },
      {
        type: 'radio',
        label: 'Horrible bite de Koréen',
        value: 'horrible'
      }],
      buttons: [{
        text: 'Submit',
        handler: rating => {
          // TODO: send rating to server
          console.log(rating);
        }
      }]
    });
    
    prompt.present(prompt);
  }

  updateArrivalTime(seconds) {
    let minutes = Math.floor(seconds/60);
    this.timeTillArrival = minutes;
  }
  riderDroppedOff() {
    this.rateDriver();
    this.isRiderPickedup = false;
    this.isPickupRequested = false;
    this.destination = null;
    this.timeTillArrival = 5;
  }

  riderPickedUp() {
    this.isRiderPickedup = true;
  }
  confirmPickup() {
    this.isPickupRequested = true;
  }

  cancelPickup() {
    this.isPickupRequested = false;
  }


}
