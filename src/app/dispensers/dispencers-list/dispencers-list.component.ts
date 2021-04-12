import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AddDisepensersComponent } from "../add-disepensers/add-disepensers.component";
import { HttpService } from "../../service/http.service";
import { AlertController } from "@ionic/angular";

@Component({
	selector: "app-dispencers-list",
	templateUrl: "./dispencers-list.component.html",
	styleUrls: ["./dispencers-list.component.scss"],
})
export class DispencersListComponent implements OnInit {
	dispencers = [];
	showSearchbar = false;
	searchedText = "";
	constructor(
		public modalController: ModalController,
		private httpService: HttpService,
		public alertController: AlertController
	) {}

	ngOnInit() {
		this.getDispencers();
	}
	getDispencers() {
		this.httpService.posts("", "customer/list").subscribe((res: any) => {
			console.log(res.data.info.data);
			this.dispencers = res.data.info.data;
			console.log("calll");
		});
	}

	onChangeOfSearch() {
		const search = { search: this.searchedText };
		console.log(search);

		this.httpService.posts(search, "customer/list").subscribe((res: any) => {
			console.log(res);
			this.dispencers = res.data.info.data;
		});
	}

	async onClickOfEdit(id) {
		const modal = await this.modalController.create({
			component: AddDisepensersComponent,
			componentProps: { value: id },
		});

		modal.onDidDismiss().then((data) => {
			console.log(data);
			this.getDispencers();
		});

		return await modal.present();
	}
	async deleteDispencer(id) {
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
							.posts({ user_id: id }, "customer/delete-dispenser")
							.subscribe((res: any) => {
								console.log("Confirm Ok");
								this.getDispencers();
								console.log(res);
							});
					},
				},
			],
		});
		await alert.present();
	}
}
