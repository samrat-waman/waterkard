import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { MapPage } from './map/map.page';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
@NgModule({
	declarations: [AppComponent, MapPage],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		IonicStorageModule.forRoot(),
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		CommonModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyCdakVgzUdZeDuk-1FgBKM5dnDpwQsV2ng',
			libraries: ['places'],
		}),
	],
	providers: [
		StatusBar,
		SplashScreen,
		PDFGenerator,
		NativeGeocoder,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
