import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { HttpService } from "../../service/http.service";

@Component({
	selector: "app-view-order",
	templateUrl: "./view-order.component.html",
	styleUrls: ["./view-order.component.scss"],
})
export class ViewOrderComponent implements OnInit {
	id = "";
	productName = "";
	customerName = "";
	phone = "";
	date = "";
	jarQuantity = "";
	orderTotal = "";
	orderDetails = {};
	constructor(
		public modalCtrl: ModalController,
		private navParams: NavParams,
		private httpService: HttpService
	) {}

	ngOnInit() {
		this.id = this.navParams.data.value;
		console.log(this.id);
		this.getOrderDetails();
	}
	onClickOfSubmit() {
		this.modalCtrl.dismiss();
	}

	getOrderDetails() {
		this.httpService
			.posts({ bottle_card_id: this.id }, "bottle-card/info")
			.subscribe((res: any) => {
				console.log(res.data.card_details);
				this.orderDetails = res.data.card_details;
				this.productName =
					res.data.card_details.product.name +
					" " +
					res.data.card_details.product.unit;
				this.customerName = res.data.card_details.customer.name;
				this.phone = res.data.card_details.customer.phone;
				this.date = res.data.card_details.date;
				this.jarQuantity = res.data.card_details.sold_quantity;
				this.orderTotal = res.data.card_details.amount;
			});
	}

	onClickOfCancel() {
		this.modalCtrl.dismiss();
	}
}
