import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { EditDepositeComponent } from "../edit-deposite/edit-deposite.component";
import { HttpService } from "../../service/http.service";
import { AlertController } from "@ionic/angular";
@Component({
	selector: "app-deposite-list",
	templateUrl: "./deposite-list.component.html",
	styleUrls: ["./deposite-list.component.scss"],
})
export class DepositeListComponent implements OnInit {
	deposits = [];
	dispencers = [];
	searchedText;
	showSearchbar = false;
	constructor(
		public modalController: ModalController,
		private httpService: HttpService,
		public alertController: AlertController
	) {}

	ngOnInit() {
		this.getDeposits();
	}

	onChangeOfSearch() {
		const search = { search: this.searchedText };
		console.log("searched: ", this.searchedText);
		this.httpService.posts(search, "customer/list").subscribe((res: any) => {
			console.log(res);
			this.deposits = res.data.info.data;
		});
	}

	getDeposits() {
		this.httpService.posts("", "customer/list").subscribe((res: any) => {
			console.log(res.data.info.data);
			this.deposits = res.data.info.data;
			console.log("calll");
		});
	}

	async onClickOfEdit(id) {
		const modal = await this.modalController.create({
			component: EditDepositeComponent,
			componentProps: { value: id },
		});

		modal.onDidDismiss().then((data) => {
			this.getDeposits();
			console.log(data);
		});

		return await modal.present();
	}
	async deleteDeposite(id) {
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
							.posts({ user_id: id }, "customer/delete-deposit")
							.subscribe((res: any) => {
								console.log("Confirm Ok");
								this.getDeposits();
								console.log(res);
							});
					},
				},
			],
		});
		await alert.present();
	}
}
