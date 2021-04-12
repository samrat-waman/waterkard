import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AddProductComponent } from "../add-product/add-product.component";
import { HttpService } from "../../service/http.service";
import { AlertController } from "@ionic/angular";
@Component({
	selector: "app-product-list",
	templateUrl: "./product-list.component.html",
	styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
	product = [];
	showSearchbar = false;
	searchedText = "";
	constructor(
		public modalController: ModalController,
		private httpService: HttpService,
		public alertController: AlertController
	) {}

	ngOnInit() {
		this.getProduct();
	}

	onChangeOfSearch() {
		console.log("searched: ", this.searchedText);
		const search = { search: this.searchedText };
		this.httpService.posts(search, "product/list").subscribe((res: any) => {
			console.log(res);
			this.product = res.data.info.data;
		});
	}

	getProduct() {
		this.httpService.posts("", "product/list").subscribe((res: any) => {
			console.log(res.data.info.data);
			this.product = res.data.info.data;
		});
	}

	async addProduct() {
		const modal = await this.modalController.create({
			component: AddProductComponent,
			componentProps: { value: 0 },
		});

		modal.onDidDismiss().then((data) => {
			this.getProduct();
		});
		return await modal.present();
	}

	async onClickOfEdit(id) {
		console.log(id);

		const modal = await this.modalController.create({
			component: AddProductComponent,
			componentProps: { value: id },
		});

		modal.onDidDismiss().then((data) => {
			this.getProduct();
			console.log(data);
		});
		return await modal.present();
	}

	async onClickOfDelete(id) {
		const alert = await this.alertController.create({
			cssClass: "my-custom-class",
			header: "Delete Item",
			// subHeader: 'Subtitle',
			message: "Do you really want to delete the entry.",
			buttons: [
				{
					text: "Cancel",
					role: "cancel",
					cssClass: "secondary",
					handler: () => {
						console.log("Confirm Cancel");
					},
				},
				{
					text: "Delete",
					handler: () => {
						this.httpService
							.posts({ product_id: id }, "product/delete")
							.subscribe((res: any) => {
								console.log("Confirm Ok");
								console.log(res);
								this.getProduct();
							});
					},
				},
			],
		});
		await alert.present();
	}
}
