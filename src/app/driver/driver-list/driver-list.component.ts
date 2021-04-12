import { ModalController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { AddDriverComponent } from "../add-driver/add-driver.component";
import { HttpService } from "../../service/http.service";
import { AlertController } from "@ionic/angular";

@Component({
	selector: "app-driver-list",
	templateUrl: "./driver-list.component.html",
	styleUrls: ["./driver-list.component.scss"],
})
export class DriverListComponent implements OnInit {
	drivers = [];
	showSearchbar = false;
	searchedText = "";
	constructor(
		public modalController: ModalController,
		private httpService: HttpService,
		public alertController: AlertController
	) {}

	ngOnInit() {
		this.getDrivers();
	}

	getDrivers() {
		this.httpService.posts("", "driver/list").subscribe((res: any) => {
			console.log(res.data.info.data);
			this.drivers = res.data.info.data;
			console.log("calll");
		});
	}
	async addDriver() {
		const modal = await this.modalController.create({
			component: AddDriverComponent,
			componentProps: { value: 0 },
		});

		modal.onDidDismiss().then((data) => {
			this.getDrivers();
		});

		return await modal.present();
	}

	onChangeOfSearch() {
		const search = { search: this.searchedText };
		this.httpService.posts(search, "driver/list").subscribe((res: any) => {
			console.log(res);
			this.drivers = res.data.info.data;
		});
	}

	async onClickOfEdit(id) {
		const modal = await this.modalController.create({
			component: AddDriverComponent,
			componentProps: { value: id },
		});

		modal.onDidDismiss().then((data) => {
			this.getDrivers();
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
							.posts({ user_id: id }, "driver/delete-vendor-driver")
							.subscribe((res: any) => {
								console.log("Confirm Ok");
								console.log(res);
								this.getDrivers();
							});
					},
				},
			],
		});
		await alert.present();
	}
}
