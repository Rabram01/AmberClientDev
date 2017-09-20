import { NgModule } from '@angular/core';
import { MapComponent } from './map/map';
import { MeMarkerComponent } from './me-marker/me-marker';
import { AvailableCarsComponent } from './available-cars/available-cars';
import { AmberCarComponent } from './amber-car/amber-car';
import { PickupCarComponent } from './pickup-car/pickup-car';
import { DestinationAdressComponent } from './destination-adress/destination-adress';

@NgModule({
	declarations: [MapComponent,
    MeMarkerComponent,
    AvailableCarsComponent,
    AmberCarComponent,
    PickupCarComponent,
    DestinationAdressComponent,],
	imports: [],
	exports: [MapComponent,
    MeMarkerComponent,
    AvailableCarsComponent,
    AmberCarComponent,
    PickupCarComponent,
    DestinationAdressComponent,]
})
export class ComponentsModule {}
