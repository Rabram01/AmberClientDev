import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class PickupPubSubProvider {

  public pickup$: Observable<any>;
  private _observer: Observer<any>;

  public EVENTS = {
    PICKUP: 'pickup',
    DROPOFF: 'dropoff',
    ARRIVAL_TIME: 'arrival-time'
  }

  constructor() {
    this.pickup$ = new Observable(observer => {
      this._observer = observer;
    }).share();
  }

  watch(){
    return this.pickup$;
  }

  emitArrivalTime(time){
    this._observer.next({
      event: this.EVENTS.ARRIVAL_TIME,
      data : time
    })
  }

  emitPickup(){
    this._observer.next({
      event: this.EVENTS.PICKUP,
      data: null
    })
  }

  emitDropOff(){
    this._observer.next({
      event: this.EVENTS.DROPOFF,
      data: null
    })
  }

}
