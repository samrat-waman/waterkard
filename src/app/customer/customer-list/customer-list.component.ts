import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AddCustomerComponent } from "../add-customer/add-customer.component";
import { CustomerProductComponent } from "../customer-product/customer-product.component";
import { HttpService } from "../../service/http.service";
import { AlertController } from "@ionic/angular";
@Component({
	selector: "app-customer-list",
	templateUrl: "./customer-list.component.html",
	styleUrls: ["./customer-list.component.scss"],
})
export class CustomerListComponent implements OnInit {
	customers = [];
	showSearchbar = false;
	searchedText = "";
	constructor(
		public modalController: ModalController,
		private httpService: HttpService,
		public alertController: AlertController
	) {}

	ngOnInit() {
		this.getCustomers();
	}

	onChangeOfSearch() {
		const search = { search: this.searchedText };
		this.httpService.posts(search, "customer/list").subscribe((res: any) => {
			console.log(res);
			this.customers = res.data.info.data;
		});
	}

	getCustomers() {
		this.httpService.posts("", "customer/list").subscribe((res: any) => {
			console.log(res.data.info.data);
			this.customers = res.data.info.data;
			console.log("calll");
		});
	}
	async addCustomer() {
		const modal = await this.modalController.create({
			component: AddCustomerComponent,
			componentProps: { value: 0 },
		});

		modal.onDidDismiss().then((data) => {
			this.getCustomers();
		});

		return await modal.present();
	}

	async onclickOfProduct(id, userId) {
		const modal = await this.modalController.create({
			component: CustomerProductComponent,
			componentProps: { value: id, id: userId },
		});

		modal.onDidDismiss().then((data) => {
			console.log(data);
		});

		return await modal.present();
	}

	async onClickOfDelete(id) {
		const alert = await this.alertController.create({
			cssClass: "my-custom-class",
			header: "Delete Item",
			// subHeader: 'Subtitle',
			message: "Do you really want to delete the entry.",
			buttons: [
				{
					text: "Cancel",
					role: "cancel",
					cssClass: "secondary",
					handler: () => {
						console.log("Confirm Cancel");
					},
				},
				{
					text: "Delete",
					handler: () => {
						this.httpService
							.posts({ user_id: id }, "customer/delete-vendor-customer")
							.subscribe((res: any) => {
								console.log("Confirm Ok");
								console.log(res);
								this.getCustomers();
							});
					},
				},
			],
		});
		await alert.present();
	}

	async onClickOfEdit(id) {
		const modal = await this.modalController.create({
			component: AddCustomerComponent,
			componentProps: { value: id },
		});

		modal.onDidDismiss().then((data) => {
			this.getCustomers();
		});

		return await modal.present();
	}
}
