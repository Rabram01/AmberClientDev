import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DataCarsProvider {

  public dirService: google.maps.DirectionsService;
  public myRoute: any;
  public myRouteIndex: number;

  constructor() {
    this.dirService = new google.maps.DirectionsService();
  }

  riderPickupCar() {
    return Observable.timer(1000);
  }

  riderDroppedOff(){
    return Observable.timer(1000)
  }

  dropoffPickupCar(pickupLocation, dropoffLocation) {
    return this.routeTrace(pickupLocation, dropoffLocation);
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

    this.myRouteIndex = 0;
    let car = this.cars1.cars[0];
    let start = new google.maps.LatLng(car.coord.lat, car.coord.lng);
    let end = currentLoc;

    return this.routeTrace(start, end);
  }

  getPickupcar() {
    return Observable.create(observable => {

      let car = this.myRoute[this.myRouteIndex]
      observable.next(car);
      this.myRouteIndex++;
    })
  }

  routeTrace(start, end) {
    return Observable.create(observable => {
      this.calcRoute(start, end).subscribe(dir => {
        this.myRoute = this.getSegmentDir(dir);
        this.getPickupcar().subscribe(car => {
          observable.next(car)
        })
      })
    });
  }

  getSegmentDir(dir) {
    let route = dir.routes[0];
    let legs = route.legs;
    let path = [];
    let increment = [];
    let duration = 0;

    let numOfLegs = legs.length;

    while (numOfLegs--) {
      let leg = legs[numOfLegs];
      let steps = leg.steps;
      let numOfgSteps = steps.length;

      while (numOfgSteps--) {
        let step = steps[numOfgSteps];
        let points = step.path;
        let numOfPoints = points.length;

        duration += step.duration.value;

        while (numOfPoints--) {
          let point = points[numOfPoints];
          path.push(point);

          increment.unshift({
            position: point,
            time: duration,
            path: path.slice(0)
          })
        }
      }
    }

    return increment;
  }

  calcRoute(start, end) {
    return Observable.create(observable => {
      this.dirService.route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
      }, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          observable.next(response);
        } else {
          observable.error(status);
        }
      })
    });
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

  private cars6 = {
    cars: [{
      id: 6,
      coord: {
        lat: 46.211097,
        lng: 6.134987
      }
    },
    {
      id: 6,
      coord: {
        lat: 46.210444,
        lng: 6.135003
      }
    },
    {
      id: 6,
      coord: {
        lat: 46.210621,
        lng: 6.135726
      }
    },
    {
      id: 6,
      coord: {
        lat: 46.210441,
        lng: 6.136617
      }
    },
    {
      id: 6,
      coord: {
        lat: 46.210154,
        lng: 6.137346
      }
    },
    {
      id: 6,
      coord: {
        lat: 46.209557,
        lng: 6.136831
      }
    }
    ]
  }


  private cars: Array<any> = [this.cars1, this.cars2, this.cars3, this.cars4, this.cars5, this.cars6];
}
