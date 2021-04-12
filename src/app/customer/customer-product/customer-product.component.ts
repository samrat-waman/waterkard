import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { HttpService } from "../../service/http.service";
import { CoreService } from "../../service/core.service";
@Component({
	selector: "app-customer-product",
	templateUrl: "./customer-product.component.html",
	styleUrls: ["./customer-product.component.scss"],
})
export class CustomerProductComponent implements OnInit {
	products = [];
	customerId = "";
	customerDetail = [];
	customerName = "";
	customer_product = {
		product_id: "",
		rate: "",
		deposit: "",
		balance_jar: "",
		dispensers: "",
		is_default: "",
		customer_id: "",
	};
	customerProductId: any;
	constructor(
		public modalCtrl: ModalController,
		private navParams: NavParams,
		private httpService: HttpService,
		private coreService: CoreService
	) {}

	ngOnInit() {
		this.customer_product.customer_id = this.navParams.data.value;

		this.customerId = this.navParams.data.id;
		this.getProducts();
		this.getSpecificCustomer(this.customerId);
	}

	getProducts() {
		this.httpService.posts("", "product/list").subscribe((res: any) => {
			this.products = res.data.info.data;
			console.log("this.products: ", this.products);
		});
	}

	getSpecificCustomer(id) {
		const data = { user_id: id };
		this.httpService.posts(data, "customer/info").subscribe((res: any) => {
			this.customerName = res.data.info.name;
			console.log(res.data);

			this.customerDetail = res.data.products;
			this.customer_product.product_id = this.customerDetail[0].product_id;
		});
	}

	onClickOfSubmit() {
		console.log(this.customer_product);

		this.getProducts();
		this.httpService
			.posts(this.customer_product, "customer/assign-product")
			.subscribe((res: any) => {
				this.coreService.presentToast(true);
			});
	}

	onClickOfCancel() {
		this.modalCtrl.dismiss();
	}
	radioGroupChange(event) {
		this.customer_product.is_default = event.detail.value;
	}
	getValue($event) {
		const name = $event.target.name;
		switch (name) {
			case "rate": {
				this.customer_product.rate = $event.target.value;
				break;
			}

			case "jar": {
				this.customer_product.balance_jar = $event.target.value;
				break;
			}

			case "dispensers": {
				this.customer_product.dispensers = $event.target.value;
				break;
			}

			case "deposit": {
				this.customer_product.deposit = $event.target.value;
				break;
			}
			default: {
				console.log($event.detail.value);

				this.customer_product.product_id = $event.detail.value;
				break;
			}
		}
	}
}
