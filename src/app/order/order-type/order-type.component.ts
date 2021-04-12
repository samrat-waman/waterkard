import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AddOrderComponent } from "../add-order/add-order.component";
@Component({
	selector: "app-order-type",
	templateUrl: "./order-type.component.html",
	styleUrls: ["./order-type.component.scss"],
})
export class OrderTypeComponent implements OnInit {
	@ViewChild("cancelButton") cancelButton: any;
	constructor(public modalController: ModalController) {}

	ngOnInit() {}
	async onClickCustomerOrder() {
		const modal = await this.modalController.create({
			component: AddOrderComponent,
			componentProps: { value: "regular" },
		});

		modal.onDidDismiss().then((data) => {
			// this.modalController.dismiss();
			// console.log(data);
			// this.onClickOfCancel();
		});

		return await modal.present();
	}
	async onClickOfEvent() {
		const modal = await this.modalController.create({
			component: AddOrderComponent,
			componentProps: { value: "event-organiser" },
		});

		modal.onDidDismiss().then((data) => {
			// this.modalController.dismiss();
			// console.log(data);
			// this.onClickOfCancel();
		});

		return await modal.present();
	}

	onClickOfCancel() {
		this.modalController.dismiss();
	}
}
