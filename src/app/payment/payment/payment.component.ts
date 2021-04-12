import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AddPaymentComponent } from "../add-payment/add-payment.component";
import { HttpService } from "../../service/http.service";
import { AlertController } from "@ionic/angular";

@Component({
	selector: "app-payment",
	templateUrl: "./payment.component.html",
	styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
	payments = [];
	showSearchbar = false;
	searchedText = "";
	totalPayment = 0;
	constructor(
		public modalController: ModalController,
		protected httpService: HttpService,
		public alertController: AlertController
	) {}

	ngOnInit() {
		this.getPayments();
	}
	getPayments() {
		this.httpService
			.posts("", "bottle-card-payment/list")
			.subscribe((res: any) => {
				console.log(res.data.info.data);
				this.payments = res.data.info.data;
				this.totalPayment = 0;
				this.payments.forEach((element: any) => {
					this.totalPayment =
						this.totalPayment + parseInt(element.pending_payment);
				});
			});
	}
	async sendRequestForPayment(id, name) {
		const alert = await this.alertController.create({
			cssClass: "my-custom-class",
			header: "Send Message",
			// subHeader: 'Subtitle',
			message: "Do you want to send a payment Request to " + name + "?",
			buttons: [
				{
					text: "No",
					role: "No",
					cssClass: "secondary",
					handler: () => {
						console.log("Confirm Cancel");
					},
				},
				{
					text: "Yes",
					handler: () => {
						this.httpService
							.posts(
								{ customer_user_id: id },
								"bottle-card-payment/request-pending-sms"
							)
							.subscribe((res: any) => {
								console.log(res);
							});
					},
				},
			],
		});
		await alert.present();
	}
	onChangeOfSearch() {
		const search = { search: this.searchedText };
		this.httpService
			.posts(search, "bottle-card-payment/list")
			.subscribe((res: any) => {
				console.log(res);
				this.payments = res.data.info.data;
			});
	}

	async addPayment(pending) {
		const modal = await this.modalController.create({
			component: AddPaymentComponent,
			componentProps: { value: pending },
		});

		modal.onDidDismiss().then((data) => {
			this.getPayments();
		});

		return await modal.present();
	}
}
