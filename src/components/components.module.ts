import { NgModule } from '@angular/core';
import { MapComponent } from './map/map';
import { MeMarkerComponent } from './me-marker/me-marker';
import { AvailableCarsComponent } from './available-cars/available-cars';
import { AmberCarComponent } from './amber-car/amber-car';
@NgModule({
	declarations: [MapComponent,
    MeMarkerComponent,
    AvailableCarsComponent,
    AmberCarComponent],
	imports: [],
	exports: [MapComponent,
    MeMarkerComponent,
    AvailableCarsComponent,
    AmberCarComponent]
})
export class ComponentsModule {}
