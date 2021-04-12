import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { HttpService } from "../../service/http.service";
import { Router } from "@angular/router";
import { CoreService } from "../../service/core.service";
@Component({
	selector: "app-add-order",
	templateUrl: "./add-order.component.html",
	styleUrls: ["./add-order.component.scss"],
})
export class AddOrderComponent implements OnInit {
	allCustomers = [];
	order = {
		bottle_card_id: "",
		customer_user_id: "",
		product_id: "",
		sold_quantity: "",
		date: "",
	};
	show = true;
	dates: any;
	id = "";
	role: any;
	customers = [];
	cu = { id: "", name: "" };
	products = [];
	customerName = "";
	ProductName = "";
	constructor(
		public modalCtrl: ModalController,
		private httpService: HttpService,
		private router: Router,
		private navParams: NavParams,
		private coreService: CoreService
	) {}

	ngOnInit() {
		this.getCustomers();
		this.id = this.navParams.data.id;
		if (this.id) {
			this.show = false;
			this.role = this.navParams.data.value;
			this.getOrderDetails();
		} else {
			this.role = this.navParams.data.value;
		}
	}

	getOrderDetails() {
		console.log(this.id);
		this.httpService
			.posts({ bottle_card_id: this.id }, "bottle-card/info")
			.subscribe((res: any) => {
				console.log(res.data.card_details);
				this.order.bottle_card_id = res.data.card_details.bottle_card_id;
				(this.order.customer_user_id = res.data.card_details.customer.user_id),
					(this.customerName = res.data.card_details.customer.name);
				(this.order.product_id = res.data.card_details.product.product_id),
					(this.ProductName =
						res.data.card_details.product.name +
						" " +
						res.data.card_details.product.unit),
					(this.order.sold_quantity = res.data.card_details.sold_quantity),
					(this.order.date = res.data.card_details.date);
			});
	}

	parseDate(dateString: string): Date {
		if (dateString) {
			this.order.date = dateString;
			const todaysDate = new Date(dateString);
			console.log(todaysDate);
		}
		return null;
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

	getCustomers() {
		const today = new Date();
		// console.log(this.formatDate(this.today));
		// console.log(this.today.toLocaleDateString("en-US"));
		this.order.date = this.formatDate(today);

		this.httpService.posts("", "customer/list").subscribe((res: any) => {
			console.log(res);
			this.allCustomers = res.data.info.data;

			this.allCustomers.forEach((res: any) => {
				if (res.customer.customer_type === this.role) {
					this.customers.push(res);
				}
			});
			// const b = this.allCustomers.filter((res) => {
			// 	res.customer.customer_type == this.role;
			// });
			// console.log(b);
		});
	}
	getValue($event) {
		this.order.customer_user_id = $event.target.value;
		this.getProducts(this.order.customer_user_id);
	}
	getJar($event) {
		console.log($event.target.value);

		this.order.sold_quantity = $event.target.value;
	}
	getProducts(id) {
		this.httpService
			.posts({ user_id: id }, "customer/info")
			.subscribe((res: any) => {
				this.products = res.data.products;
				console.log(this.products);
			});
	}

	getProductID($event) {
		this.order.product_id = $event.target.value;
		console.log(this.order.product_id);
	}

	getDate($event) {
		const date = $event.detail.value;
		this.order.date = date.slice(0, 10);
	}
	onClickOfSubmit() {
		if (this.id) {
			console.log(this.order);
			console.log("hello");
			this.httpService
				.posts(this.order, "bottle-card/edit")
				.subscribe((res: any) => {
					this.coreService.presentToast(false);
				});
		} else {
			this.httpService
				.posts(this.order, "bottle-card/add")
				.subscribe((res: any) => {
					this.coreService.presentToast(true);
				});
		}
	}

	onClickOfCancel() {
		this.modalCtrl.dismiss();
	}
}
