import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//Composant
import { MapComponent } from '../components/map/map';
import { MeMarkerComponent } from '../components/me-marker/me-marker';
import { AvailableCarsComponent } from '../components/available-cars/available-cars';
import { CarProvider } from '../providers/car/car';
import { DataCarsProvider } from '../providers/data-cars/data-cars';
import { AmberCarComponent } from '../components/amber-car/amber-car';
//Firebase
import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database'


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapComponent,
    MeMarkerComponent,
    AvailableCarsComponent,
    AmberCarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapComponent,
    MeMarkerComponent,
    AvailableCarsComponent,
    AmberCarComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Geolocation,
    CarProvider,
    DataCarsProvider
  ]
})
export class AppModule { }
