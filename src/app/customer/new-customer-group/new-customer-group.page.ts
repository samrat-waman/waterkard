import { CoreService } from 'src/app/service/core.service';
import { map, merge } from 'rxjs/operators';
import { NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpService } from 'src/app/service/http.service';
import { concat } from 'rxjs';

@Component({
	selector: 'app-new-customer-group',
	templateUrl: './new-customer-group.page.html',
	styleUrls: ['./new-customer-group.page.scss'],
})
export class NewCustomerGroupPage implements OnInit {
	searchedText;
	showSearchbar = false;
	groupCustomers = [];
	customers = [];
	group_name = '';
	driver_user_id = '';
	description = '';
	groupData: any;
	isDriver: boolean;
	drivers = [];

	constructor(
		public modalController: ModalController,
		private httpService: HttpService,
		private navParams: NavParams,
		private coreService: CoreService
	) { }

	ngOnInit() {
		this.getDrivers();
		const groupData = this.navParams.data['groupData'];
		if (groupData) {
			this.groupData = groupData;
			this.driver_user_id = this.groupData.driver_user_id;
			this.group_name = this.groupData.group_name;
			this.description = this.groupData.description;
			this.groupCustomers = this.groupData.group_customers.map(
				(el) => el.customer_user_id
			);
		}
		this.isDriver = this.coreService.getDriverState();
		this.getCustomers();
	}


	createOrUpdateGroup() {
		if (this.groupData) {
			this.updateGroup();
			return;
		}
		const { group_name, description, driver_user_id } = this;
		const customer_users = this.groupCustomers;
		this.httpService
			.posts(
				{ group_name, description, driver_user_id, customer_users },
				'customer-group/create'
			)
			.subscribe((res: any) => {
				console.log(res);
				this.modalController.dismiss(true);
			});
	}

	getDrivers() {
		this.httpService.posts('', 'driver/list').subscribe((res: any) => {
			this.drivers = res.data.info.data;

		})
	}

	updateGroup() {
		const { group_name, description, driver_user_id } = this;
		const customer_users = this.groupCustomers;
		const customer_group_id = this.groupData.customer_group_id;
		concat(
			this.httpService.posts(
				{ group_name, description, driver_user_id, customer_group_id },
				'customer-group/edit'
			),
			this.httpService.posts(
				{ customer_users, customer_group_id },
				'customer-group/add-customers'
			)
		).subscribe((res: any) => {
			console.log(res);
			this.modalController.dismiss(true);
		});
	}

	onChangeOfSearch() {
		this.getCustomers(this.searchedText);
	}

	getCustomers(term = '') {
		const search = { search: term };
		this.httpService
			.posts(search, 'customer/list')
			.subscribe((res: any) => {
				console.log(res);
				this.customers = res.data.info.data;
				if (this.isDriver) {
					this.customers = this.customers.filter(el => {
						return this.groupCustomers.includes(el.user_id);
					});
				}
				this.customers.sort((x, y) => {
					return this.groupCustomers.includes(x.user_id) ? 1 : 0;
				});

			});
	}

	customerToggled(evt, customer) {
		console.log(evt);
		if (evt.target.checked) {
			if (!this.groupCustomers.includes(customer.user_id)) {
				this.groupCustomers.push(customer.user_id);
			}
		} else {
			const idx = this.groupCustomers.findIndex(
				(el) => el === customer.user_id
			);
			this.groupCustomers.splice(idx, 1);
		}
	}
}
