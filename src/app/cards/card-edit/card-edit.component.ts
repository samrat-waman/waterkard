import { Component, OnInit } from "@angular/core";
import { NavParams } from "@ionic/angular";
import { ModalController } from "@ionic/angular";
import { HttpService } from "../../service/http.service";
import { Router } from "@angular/router";
@Component({
	selector: "app-card-edit",
	templateUrl: "./card-edit.component.html",
	styleUrls: ["./card-edit.component.scss"],
})
export class CardEditComponent implements OnInit {
	public value = this.navParams.get("value");
	card = {
		customer_user_id: "",
		product_id: "",
		sold_quantity: "",
		balance_jar: "",
		date: "",
		empty_jar: "",
	};

	date: string;
	type: "string";
	today: any;
	customerName = "";
	pendingPayment: number;
	advancePayment: number;
	jar: any;
	balance: number;
	totalBalanceJar: number;
	customerProducts = [];
	dates: any;
	constructor(
		private navParams: NavParams,
		private httpService: HttpService,
		public modalCtrl: ModalController,
		private router: Router
	) {}

	ngOnInit() {
		this.card.customer_user_id = this.value;
		this.getSpecificCustomer(this.value);
		this.totalBalanceJar = 1;
	}

	parseDate(dateString: string): Date {
		if (dateString) {
			this.card.date = dateString;
			const todaysDate = new Date(dateString);
			console.log(todaysDate);
		}
		return null;
	}

	onChange($event) {
		console.log($event);
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

	getSpecificCustomer(id) {
		this.today = new Date();
		// console.log(this.formatDate(this.today));
		// console.log(this.today.toLocaleDateString("en-US"));
		this.card.date = this.formatDate(this.today);
		// this.card.date = this.today.toLocaleDateString("en-US");
		const data = { user_id: id };
		this.httpService.posts(data, "customer/info").subscribe((res: any) => {
			this.customerProducts = res.data.products;
			this.customerName = res.data.info.name;
			this.pendingPayment = parseInt(res.data.info.customer.pending_payment);
			this.advancePayment = parseInt(res.data.info.customer.advance_payment);
			this.card.balance_jar = res.data.info.customer.balance_jar;
			this.jar = this.card.balance_jar;

			console.log(res);
		});
	}

	getDate($event) {
		const date = $event.detail.value;
		console.log($event);

		this.card.date = date.slice(0, 10);
	}

	getValue($event) {
		const name = $event.target.name;
		switch (name) {
			case "date": {
				this.card.date = $event.target.value;
				break;
			}
			case "sold": {
				this.card.sold_quantity = $event.target.value;
				this.balance = 0;
				this.card.balance_jar = this.jar;
				this.balance =
					parseInt(this.card.balance_jar) + parseInt(this.card.sold_quantity);
				console.log(this.balance);
				this.card.balance_jar = this.balance.toString();
				if (this.card.empty_jar) {
					const balance =
						parseInt(this.card.balance_jar) - parseInt(this.card.empty_jar);
					this.card.balance_jar = balance.toString();
				}
				break;
			}
			case "empty": {
				this.card.empty_jar = $event.target.value;
				this.totalBalanceJar = 0;
				this.totalBalanceJar = this.balance - parseInt(this.card.empty_jar);
				if (this.totalBalanceJar >= 0) {
					this.card.balance_jar = this.totalBalanceJar.toString();
				}
				break;
			}
			case "balance": {
				this.card.balance_jar = $event.target.value;

				break;
			}

			default: {
				console.log($event.detail.value);
				this.card.product_id = $event.detail.value;
				break;
			}
		}
	}

	onClickOfSubmit(form) {
		form.submitted = true;
		if (form.valid && this.card.empty_jar <= this.jar) {
			console.log(this.card);
			this.httpService
				.posts(this.card, "bottle-card/add")
				.subscribe((res: any) => {
					console.log(res);
				});
			this.modalCtrl.dismiss();
		}
	}

	onClickOfCancel() {
		this.modalCtrl.dismiss();
	}
	onClickOfSubmitAddPayment(form) {
		form.submitted = true;
		if (form.valid) {
			this.httpService
				.posts(this.card, "bottle-card/add")
				.subscribe((res: any) => {
					console.log(res);
				});
			this.modalCtrl.dismiss();
			this.router.navigate(["/Payment"]);
		}
	}
}
