import { LoadingService } from './../../services/loading/loading.service';
import { MapPage } from './../../map/map.page';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { HttpService } from '../../service/http.service';
import { FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { CoreService } from '../../service/core.service';
import {
	NativeGeocoder,
	NativeGeocoderResult,
	NativeGeocoderOptions,
} from '@ionic-native/native-geocoder/ngx';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
	selector: 'app-add-customer',
	templateUrl: './add-customer.component.html',
	styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent implements OnInit {
	geocodeOptions: NativeGeocoderOptions = {
		useLocale: true,
		maxResults: 5,
	};
	customer = {
		user_id: '',
		name: '',
		phone: '',
		customer_type: '',
		email: '',
		product_id: '',
		rate: '',
		deposit: '',
		city: '',
		address: '',
		pincode: '',
		balance_jar: '',
		dispensers: '',
		longitude: null,
		latitude: null
	};
	mobilePattern = /^((\\+91-?)|0)?[0-9]{10}$/;
	emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	emailFormControl = new FormControl('', [
		Validators.required,
		Validators.email,
	]);
	products = [];
	title = 'Add New Customer';
	buttonName = 'Submit';

	show = true;
	customerId: any;
	constructor(
		public modalCtrl: ModalController,
		private httpService: HttpService,
		private navParams: NavParams,
		public toastController: ToastController,
		private modalController: ModalController,
		public coreService: CoreService,
		private nativeGeocoder: NativeGeocoder,
		private alertService: AlertService,
		private loaderService: LoadingService
	) {}

	ngOnInit() {
		this.customer.customer_type = 'regular';
		this.customerId = this.navParams.data.value;
		this.customer.user_id = this.customerId;
		if (this.customerId) {
			this.show = false;
			this.title = 'Edit Customer';
			this.buttonName = 'Update';
			this.getSpecificCustomer(this.customerId);
		} else {
			console.log('add');
		}

		this.getProducts();
	}

	getSpecificCustomer(id) {
		this.httpService
			.posts({ user_id: id }, 'customer/info')
			.subscribe((res: any) => {
				console.log(res.data.info);
				(this.customer.name = res.data.info.name),
					(this.customer.phone = res.data.info.phone),
					(this.customer.customer_type =
						res.data.info.customer.customer_type),
					console.log(this.customer.customer_type);

				(this.customer.email = res.data.info.email),
					(this.customer.city = res.data.info.customer.city),
					(this.customer.address = res.data.info.customer.address),
					(this.customer.pincode = res.data.info.customer.pincode);
			});
	}

	radioGroupChange(event) {
		this.customer.customer_type = event.detail.value;
	}

	getProducts() {
		this.httpService.posts('', 'product/list').subscribe((res: any) => {
			this.products = res.data.info.data;
			console.log(this.products);
		});
	}
	onClickOfSubmit(form) {
		form.submitted = true;
		if (form.valid) {
			console.log(this.customer);
			if (this.customerId) {
				this.httpService
					.posts(this.customer, 'customer/edit')
					.subscribe((res: any) => {
						if (res.is_error) {
							this.coreService.errorHandale();
						} else {
							this.coreService.presentToast(false);
						}
					});
			} else {
				this.httpService
					.posts(this.customer, 'customer/create')
					.subscribe((res: any) => {
						if (res.is_error) {
							this.coreService.errorHandale();
						} else {
							this.coreService.presentToast(true);
						}
					});
			}
		}
	}

	onClickOfCancel() {
		this.modalCtrl.dismiss();
	}
	getValue($event) {
		const name = $event.target.name;
		switch (name) {
			case 'name': {
				this.customer.name = $event.target.value;
				break;
			}
			case 'mobile': {
				this.customer.phone = $event.target.value;
				break;
			}
			case 'city': {
				this.customer.city = $event.target.value;
				break;
			}
			case 'address': {
				this.customer.address = $event.target.value;
				break;
			}
			case 'pin': {
				this.customer.pincode = $event.target.value;
				break;
			}

			case 'email': {
				this.customer.email = $event.target.value;
				break;
			}

			case 'rate': {
				this.customer.rate = $event.target.value;
				break;
			}

			case 'jar': {
				this.customer.balance_jar = $event.target.value;
				break;
			}

			case 'dispensers': {
				this.customer.dispensers = $event.target.value;
				break;
			}

			case 'deposit': {
				this.customer.deposit = $event.target.value;
				break;
			}
			default: {
				console.log($event.detail.value);
				this.customer.product_id = $event.detail.value;
				break;
			}
		}
	}

	async showMap() {
		let componentProps;
		if(this.coreService.getDriverState()) {
			componentProps = {isEdit: true, lngLat: [this.customer.longitude, this.customer.latitude]};
		}
		const modal = await this.modalController.create({
			component: MapPage,
			componentProps
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
				if(geocodeData) {
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
					this.customer.address = address;
					this.customer.city = city;
					this.customer.pincode = postalCode;
					this.customer.longitude = longitude;
					this.customer.latitude = latitude;
				}
				loader.dismiss();
			}
		});
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
		if(!result) {
			this.alertService.showAlert('An error occured while getting your location. Try again.');
			return result;
		}
		return result;
	}
}
