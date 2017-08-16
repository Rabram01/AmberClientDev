import { NgModule } from '@angular/core';
import { MapComponent } from './map/map';
import { MeMarkerComponent } from './me-marker/me-marker';
@NgModule({
	declarations: [MapComponent,
    MeMarkerComponent],
	imports: [],
	exports: [MapComponent,
    MeMarkerComponent]
})
export class ComponentsModule {}
