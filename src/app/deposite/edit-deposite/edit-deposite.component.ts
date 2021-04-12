import { Component, OnInit } from "@angular/core";
import { HttpService } from "../../service/http.service";
import { ModalController, NavParams } from "@ionic/angular";
@Component({
	selector: "app-edit-deposite",
	templateUrl: "./edit-deposite.component.html",
	styleUrls: ["./edit-deposite.component.scss"],
})
export class EditDepositeComponent implements OnInit {
	constructor(
		public modalCtrl: ModalController,
		private navParams: NavParams,
		private httpService: HttpService
	) {}
	id: any;
	customerDeposit = {
		user_id: "",
		product_id: "",
		deposit: "",
	};
	products = [];
	ngOnInit() {
		this.id = this.navParams.data.value;
		console.log(this.id);
		this.customerDeposit.user_id = this.id;
		this.getSpecificCustomerDeposite(this.id);
		// this.getProducts();
	}
	onClickOfSubmit() {
		console.log(this.customerDeposit);

		this.httpService
			.posts(this.customerDeposit, "customer/update-deposit")
			.subscribe((res: any) => {
				console.log(res);
			});
		this.modalCtrl.dismiss();
	}
	getSpecificCustomerDeposite(id) {
		this.httpService
			.posts({ user_id: id }, "customer/info")
			.subscribe((res: any) => {
				console.log(res.data.products);
				this.customerDeposit.deposit = res.data.info.customer.deposit;
				this.customerDeposit.product_id =
					res.data.products[0].product.product_id;
				this.products = res.data.products;
			});
	}

	onClickOfCancel() {
		this.modalCtrl.dismiss();
	}
}
