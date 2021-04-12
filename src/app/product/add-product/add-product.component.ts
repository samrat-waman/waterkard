import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { HttpService } from "../../service/http.service";
import { CoreService } from "../../service/core.service";
@Component({
	selector: "app-add-product",
	templateUrl: "./add-product.component.html",
	styleUrls: ["./add-product.component.scss"],
})
export class AddProductComponent implements OnInit {
	product = {
		product_id: "",
		name: "",
		price: "",
		unit: "",
		is_default: "",
	};
	defaul = "";
	defaultSelectedRadio = "no";
	selectedRadioGroup: any;
	selectedRadioItem: any;
	productId: any;
	title = "Add Product";
	buttonName = "Submit";
	constructor(
		public modalCtrl: ModalController,
		private httpService: HttpService,
		private navParms: NavParams,
		private coreService: CoreService
	) {}

	ngOnInit() {
		this.productId = this.navParms.data.value;
		this.product.is_default = "0";
		if (this.productId) {
			this.product.product_id = this.productId;
			this.title = "Edit Product";
			this.buttonName = "Update";
			this.getSpecificProuduct(this.productId);
		} else {
			console.log("add");
		}
	}

	getSpecificProuduct(id) {
		this.httpService
			.posts({ product_id: id }, "product/info")
			.subscribe((res: any) => {
				console.log(res.data.info);
				this.product.name = res.data.info.name;
				this.product.price = res.data.info.price;
				this.product.unit = res.data.info.unit;
				if (res.data.info.is_default) {
					this.product.is_default = "1";
				} else {
					this.product.is_default = "0";
				}
			});
	}

	radioGroupChange(event) {
		this.product.is_default = event.detail.value;
	}
	//
	getValue($event) {
		const name = $event.target.name;
		switch (name) {
			case "name": {
				this.product.name = $event.target.value;
				break;
			}
			case "price": {
				this.product.price = $event.target.value;
				break;
			}
			default: {
				console.log($event.detail.value);
				this.product.unit = $event.detail.value;
				break;
			}
		}
	}

	onClickOfSubmit(form) {
		form.submitted = true;
		if (form.valid) {
			console.log(this.product);
			if (this.productId) {
				this.httpService
					.posts(this.product, "product/update")
					.subscribe((res: any) => {
						this.coreService.presentToast(false);
					});
			} else {
				this.httpService
					.posts(this.product, "product/create")
					.subscribe((res: any) => {
						this.coreService.presentToast(true);
						this.httpService.posts("", "product/list");
					});
			}
		}
	}

	onClickOfCancel() {
		this.modalCtrl.dismiss();
	}
}
