import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AlertController, ModalController } from '@ionic/angular';

// const { CapacitorGoogleMaps } = Plugins;
const { Geolocation } = Plugins;


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  lat = 19.1256597;
  lng = 73.9894382;
  hasPermission: boolean;

  @ViewChild('map') mapView: ElementRef;
  centerData: any;
  showTarget: boolean;

  constructor(private alertController: AlertController, private modalController: ModalController) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  async ionViewDidEnter() {
    Geolocation.requestPermissions()
      .then(res => {
        console.log('in map component: ', res.results);
        this.hasPermission = true;
        this.getCurrentPosition();
      }, err => {
        this.showAlert('You need to enable locations permissions');
      });
  }

  async showAlert(message) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  mapClicked(evt) {
    console.log(evt);

  }

  centerChanged(evt) {
    // this.lat = evt.lat;
    // this.lng = evt.lng;
    this.centerData = evt;
  }

  mapZoomed(evt) {
    console.log('Zoomed', evt);

  }

  mapDragStart() {
    console.log('Drag started');
    this.showTarget = true;
  }

  mapDragEnded() {
    console.log(this.centerData);
    this.lat = this.centerData?.lat;
    this.lng = this.centerData?.lng;
    this.showTarget = false;
  }

  markerDropped(evt) {
    console.log(evt);
    this.lat = evt.latLng.lat();
    this.lng = evt.latLng.lng();
  }

  selectLocation() {
    this.modalController.dismiss({ coords: [this.lat, this.lng] });
  }

  ionViewDidLeave() {
    // CapacitorGoogleMaps.close();
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.lat = coordinates.coords.latitude;
    this.lng = coordinates.coords.longitude;
  }

}
