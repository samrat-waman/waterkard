import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { HttpService } from "../../service/http.service";
import { CoreService } from "../../service/core.service";
@Component({
	selector: "app-edit-payment-history",
	templateUrl: "./edit-payment-history.component.html",
	styleUrls: ["./edit-payment-history.component.scss"],
})
export class EditPaymentHistoryComponent implements OnInit {
	customers = [];
	todaysDate: any;
	id = "";
	today: any;
	constructor(
		private modalCtrl: ModalController,
		private httpService: HttpService,
		private navParmas: NavParams,
		private coreService: CoreService
	) {}

	payment = {
		bottle_card_payment_id: "",
		payment_amount: "",
		date: "",
	};
	dates: any;
	name = "";
	pendingPayment = "";
	ngOnInit() {
		this.payment.bottle_card_payment_id = this.navParmas.data.value;
		this.payment.date = this.navParmas.data.date;
		this.payment.payment_amount = this.navParmas.data.amount;
		console.log(this.id);
		this.today = new Date().toJSON().split("T")[0];
		console.log(this.today);
	}

	parseDate(dateString: string): Date {
		if (dateString) {
			this.payment.date = dateString;
			const todaysDate = new Date(dateString);
			console.log(todaysDate);
		}
		return null;
	}

	onClickOfSubmit() {
		console.log(this.payment);
		this.httpService
			.posts(this.payment, "bottle-card-payment/update")
			.subscribe((res: any) => {
				this.coreService.presentToast(true);
			});

		this.modalCtrl.dismiss();
	}

	formatDate(date) {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [year, month, day].join("-");
	}

	onClickOfCancel() {
		this.modalCtrl.dismiss();
	}

	getValue($event) {
		const name = $event.target.name;
		switch (name) {
			case "paymentAmount": {
				this.payment.payment_amount = $event.target.value;
				break;
			}
			case "date": {
				const date = $event.target.value;
				this.payment.date = date.slice(0, 10);
				break;
			}
		}
	}
}
