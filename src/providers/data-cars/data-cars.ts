import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DataCarsProvider {

  public dirService: google.maps.DirectionsService;

  constructor() {
    this.dirService = new google.maps.DirectionsService();
  }
  getCars(lat, lng) {

    let carData = this.cars[this.carIndex];

    this.carIndex++;

    if (this.carIndex > this.cars.length - 1) {
      this.carIndex = 0;
    }

    return Observable.create(
      observer => observer.next(carData)
    )
  }
  findCar(currentLoc) {
    let car = this.cars1.cars[0];
    let start = new google.maps.LatLng(car.coord.lat, car.coord.lng);
    let end = currentLoc;

    this.routeTrace(start, end);
  }

  routeTrace(start, end) {
    return Observable.create(observable => {
      this.calcRoute(start, end).subscribe(dir => {

      })
    });
  }

  calcRoute(start, end) {
    return Observable.create(observable => {
      this.dirService.route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
      }, (response, status) => {
        if(status === google.maps.DirectionsStatus.OK){
          observable.next(status);
        } else {
          observable.error(status);
        }
      })
    })
  }

  private carIndex: number = 0;

  private cars1 = {
    cars: [{
      id: 1,
      coord: {
        lat: 46.211168,
        lng: 6.134818
      }
    },
    {
      id: 1,
      coord: {
        lat: 46.210017,
        lng: 6.138015
      }
    }
    ]
  };

  private cars2 = {
    cars: [{
      id: 2,
      coord: {
        lat: 46.208844,
        lng: 6.137200
      }
    },
    {
      id: 2,
      coord: {
        lat: 46.209807,
        lng: 6.136275
      }
    }
    ]
  };

  private cars3 = {
    cars: [{
      id: 3,
      coord: {
        lat: 46.208829,
        lng: 6.132383
      }
    },
    {
      id: 3,
      coord: {
        lat: 46.211164,
        lng: 6.134834
      }
    }
    ]
  };

  private cars4 = {
    cars: [{
      id: 4,
      coord: {
        lat: 46.210295,
        lng: 6.134888
      }
    },
    {
      id: 4,
      coord: {
        lat: 46.209627,
        lng: 6.133772
      }
    }
    ]
  };

  private cars5 = {
    cars: [{
      id: 5,
      coord: {
        lat: 46.208951,
        lng: 6.140038
      }
    },
    {
      id: 5,
      coord: {
        lat: 46.210473,
        lng: 6.136883
      }
    }
    ]
  };


  private cars: Array<any> = [this.cars1, this.cars2, this.cars3, this.cars4, this.cars5];
}
