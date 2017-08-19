import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapComponent } from '../../components/map/map';
import { Driver } from './../../models/driver';

//Firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  driverListRef$: FirebaseObjectObservable<Driver>
  result;
  public res;
  public isPickupRequested: boolean;
  constructor(public navCtrl: NavController, private aFauth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
    this.isPickupRequested = false;

  }
  ionViewDidLoad() {
    this.res = this.aFauth.auth.signInWithEmailAndPassword('test@test.ch', 'password');
    this.aFauth.authState.subscribe(data => {
      this.driverListRef$ = this.afDatabase.object('profile');
      this.driverListRef$.subscribe(x => {
        for (var key in x) {
          //console.log(key, x[key]);
          this.result = x[key];
          console.log(this.result.lat);
        }
      });
    });
  }

  confirmPickup() {
    this.isPickupRequested = true;
  }

  cancelPickup() {
    this.isPickupRequested = false;
  }


}
