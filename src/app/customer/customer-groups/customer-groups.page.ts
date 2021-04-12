import { CoreService } from 'src/app/service/core.service';
import { SingleCustomerGroupPage } from './../single-customer-group/single-customer-group.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpService } from 'src/app/service/http.service';
import { NewCustomerGroupPage } from '../new-customer-group/new-customer-group.page';

@Component({
	selector: 'app-customer-groups',
	templateUrl: './customer-groups.page.html',
	styleUrls: ['./customer-groups.page.scss'],
})
export class CustomerGroupsPage implements OnInit {
	searchedText;
	showSearchbar = false;
	groups = [];
	isDriver: boolean;

	constructor(
		public modalController: ModalController,
		private httpService: HttpService,
		private coreService: CoreService
	) { }

	ngOnInit() {
		this.getCustomerGroups();
		this.isDriver = this.coreService.getDriverState();
	}

	getCustomerGroups(term = '') {
		const search = { search: term };
		this.httpService
			.posts(search, 'customer-group/list')
			.subscribe((res: any) => {
				console.log(res);
				this.groups = res.data.info.data;
			});
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

	async addGroup() {
		const modal = await this.modalController.create({
			component: NewCustomerGroupPage,
		});
		await modal.present();
		modal.onDidDismiss().then(res => {
			if (res.data) {
				this.getCustomerGroups();
			}
		});
	}

	async openGroup(groupData) {
		const modal = await this.modalController.create({
			component: NewCustomerGroupPage,
			componentProps: { groupData }
		});
		await modal.present();
		modal.onDidDismiss().then(res => {
			if (res.data) {
				this.getCustomerGroups();
			}
		})
	}
}
