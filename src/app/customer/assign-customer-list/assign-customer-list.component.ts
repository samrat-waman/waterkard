import { SingleCustomerGroupPage } from './../single-customer-group/single-customer-group.page';
import { LoadingService } from './../../services/loading/loading.service';
import { MapPage } from './../../map/map.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpService } from '../../service/http.service';
import { FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { CoreService } from '../../service/core.service';
import { AlertService } from 'src/app/services/alert/alert.service';

import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@ionic-native/native-geocoder/ngx';
@Component({
  selector: 'app-assign-customer-list',
  templateUrl: './assign-customer-list.component.html',
  styleUrls: ['./assign-customer-list.component.scss'],
})
export class AssignCustomerListComponent implements OnInit {
  customerGropId = '';
  geocodeOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5,
  };
  searchedText;
  showSearchbar = false;
  assignCustomer = [];
  customerDetails = [];

  constructor(
    public modalCtrl: ModalController,
    private httpService: HttpService,

    public toastController: ToastController,
    private modalController: ModalController,
    public coreService: CoreService,
    private nativeGeocoder: NativeGeocoder,
    private alertService: AlertService,
    private loaderService: LoadingService
  ) { }

  ngOnInit() {
    this.getCustomerGroups();
  }
  customerLocation() {
    console.log("hello");

  }

  async reverseGeocode(latitude, longitude) {
    const result: NativeGeocoderResult[] = await this.nativeGeocoder.reverseGeocode(
      latitude,
      longitude,
      this.geocodeOptions
    ).catch(err => {
      return null;
    })
    console.log(result);
    if (!result) {
      this.alertService.showAlert('An error occured while getting your location. Try again.');
      return result;
    }
    return result;
  }

  async showMap() {
    console.log('clicked map');

    const modal = await this.modalController.create({
      component: MapPage,

    });

    await modal.present();
    modal.onDidDismiss().then(async (res) => {
      console.log(res.data);
      if (res.data) {
        const loader = await this.loaderService.showLoader();
        const geocodeData = await this.reverseGeocode(
          res.data.coords[0],
          res.data.coords[1]
        );
        console.log(geocodeData);
        if (geocodeData) {
          const {
            subThoroughfare,
            thoroughfare,
            subLocality,
            locality,
            subAdministrativeArea,
            administrativeArea,
            postalCode,
            longitude,
            latitude
          } = geocodeData[0];
          const address = `${subThoroughfare} ${thoroughfare} ${subLocality} ${locality} ${subAdministrativeArea}`;
          const city = administrativeArea;
          // this.customer.address = address;
          // this.customer.city = city;
          // this.customer.pincode = postalCode;
          // this.customer.longitude = longitude;
          // this.customer.latitude = latitude;
        }
        loader.dismiss();
      }
    });
  }

  getCustomerGroups(term = '') {
    this.httpService.posts('', 'customer-group/list').subscribe((res: any) => {
      this.customerGropId = res.data.info.data[0].customer_group_id;
      this.httpService
        .posts({ customer_group_id: this.customerGropId }, 'customer-group/info')
        .subscribe((res: any) => {
          console.log(res.data.group_details.group_customers);
          this.assignCustomer = res.data.group_details.group_customers;
          this.assignCustomer.forEach((ele) => {

            console.log(ele.customer_user_id);
            this.httpService.posts({ user_id: ele.customer_user_id }, 'customer/info').subscribe((res: any) => {
              this.customerDetails.push(res.data.info);

            })
            console.log(this.customerDetails);


          })
          // this.assignCustomer = res.data.info.data;
        });
    })
    console.log(this.customerGropId);


  }
  onChangeOfSearch() {
    this.getCustomerGroups(this.searchedText);
  }
  async showGroup(notification?) {
    const modal = await this.modalController.create({
      component: SingleCustomerGroupPage,
      componentProps: { notification },
    });
    await modal.present();
  }
}
