import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { HttpService } from "../../service/http.service";
import { CoreService } from "../../service/core.service";
@Component({
	selector: "app-add-payment",
	templateUrl: "./add-payment.component.html",
	styleUrls: ["./add-payment.component.scss"],
})
export class AddPaymentComponent implements OnInit {
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
		customer_user_id: "",
		payment_amount: "",
		payment_mode: "",
		date: "",
		cheque_number: "",
	};
	dates: any;
	name = "";
	pendingPayment = "";
	ngOnInit() {
		this.id = this.navParmas.data.value;
		console.log(this.id);
		this.today = new Date().toJSON().split("T")[0];
		console.log(this.today);

		this.getCustomers(this.id);
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
			.posts(this.payment, "bottle-card-payment/add")
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

	getCustomers(id) {
		this.today = new Date();
		this.todaysDate = this.formatDate(this.today);
		// console.log(this.formatDate(this.today));
		// console.log(this.today.toLocaleDateString("en-US"));
		this.payment.date = this.formatDate(this.today);

		// this.card.date = this.today.toLocaleDateString("en-US");
		this.httpService
			.posts({ user_id: id }, "customer/info")
			.subscribe((res: any) => {
				console.log(res);
				// this.customers=res.data.info.data;
				this.payment.customer_user_id = res.data.info.user_id;
				this.name = res.data.info.name;
				this.pendingPayment = res.data.info.customer.pending_payment;
			});
	}

	onClickOfCancel() {
		this.modalCtrl.dismiss();
	}
	mode($event) {
		this.payment.payment_mode = $event.target.value;
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
			case "note": {
				this.payment.cheque_number = $event.target.value;
				break;
			}
			default: {
				this.payment.customer_user_id = $event.target.value;
				break;
			}
		}
	}
}
