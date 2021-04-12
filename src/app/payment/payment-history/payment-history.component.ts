import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { HttpService } from "../../service/http.service";
import { ModalController } from "@ionic/angular";
import { EditPaymentHistoryComponent } from "../edit-payment-history/edit-payment-history.component";

@Component({
	selector: "app-payment-history",
	templateUrl: "./payment-history.component.html",
	styleUrls: ["./payment-history.component.scss"],
})
export class PaymentHistoryComponent implements OnInit {
	showSearchbar = false;
	name = "samrat";
	searchedText = "";
	paymentHistory = [];
	id: any;
	constructor(
		private route: ActivatedRoute,
		private httpService: HttpService,
		public alertController: AlertController,
		public modalController: ModalController
	) {}

	ngOnInit() {
		console.log(this.route);

		this.id = this.route.snapshot.params.id;
		console.log(this.id);
		this.getPaymentHistory(this.id);
	}

	getPaymentHistory(id) {
		this.httpService
			.posts({ customer_user_id: id }, "bottle-card-payment/history")
			.subscribe((res: any) => {
				this.paymentHistory = res.data.info.data;
				console.log(this.paymentHistory);
			});
	}
	onChangeOfSearch() {
		console.log("hello");
	}
	async editPaymentHistory(paymentHistoryId, date, amount) {
		const modal = await this.modalController.create({
			component: EditPaymentHistoryComponent,
			componentProps: { value: paymentHistoryId, date: date, amount },
		});

		modal.onDidDismiss().then((data) => {
			console.log(data);
			this.getPaymentHistory(this.id);
		});

		return await modal.present();
	}

	async deletePaymentHistory(paymentHistoryId) {
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
							.posts(
								{ bottle_card_payment_id: paymentHistoryId },
								"bottle-card-payment/delete"
							)
							.subscribe((res: any) => {
								console.log("Confirm Ok");
								console.log(res);
								this.getPaymentHistory(this.id);
							});
					},
				},
			],
		});
		await alert.present();
	}
}
