import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../service/http.service";
import { ModalController, NavParams } from "@ionic/angular";
@Component({
	selector: "app-add-disepensers",
	templateUrl: "./add-disepensers.component.html",
	styleUrls: ["./add-disepensers.component.scss"],
})
export class AddDisepensersComponent implements OnInit {
	constructor(
		public modalCtrl: ModalController,
		private navParams: NavParams,
		private httpService: HttpService
	) {}
	id: any;
	customerDeposit = {
		user_id: "",
		product_id: "",
		dispenser: "",
	};
	products = [];
	ngOnInit() {
		this.id = this.navParams.data.value;
		console.log(this.id);
		this.customerDeposit.user_id = this.id;
		this.getSpecificCustomerDispenser(this.id);
		// this.getProducts();
	}
	onClickOfSubmit() {
		console.log(this.customerDeposit);

		this.httpService
			.posts(this.customerDeposit, "customer/update-dispenser")
			.subscribe((res: any) => {
				console.log(res);
			});
		this.modalCtrl.dismiss();
	}
	getSpecificCustomerDispenser(id) {
		this.httpService
			.posts({ user_id: id }, "customer/info")
			.subscribe((res: any) => {
				console.log(res.data.products);
				this.customerDeposit.dispenser = res.data.products[0].dispensers;
				this.products = res.data.products;
				this.customerDeposit.product_id =
					res.data.products[0].product.product_id;
			});
	}

	onClickOfCancel() {
		this.modalCtrl.dismiss();
	}
}
