import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { OrderTypeComponent } from "../order-type/order-type.component";
import { AddOrderComponent } from "../add-order/add-order.component";
import { ViewOrderComponent } from "../view-order/view-order.component";
import { HttpService } from "../../service/http.service";
import { PopoverController } from "@ionic/angular";
import { PopoverPage } from "./order-popover";
@Component({
	selector: "app-order-list",
	templateUrl: "./order-list.component.html",
	styleUrls: ["./order-list.component.scss"],
})
export class OrderListComponent implements OnInit {
	orders = [];
	showSearchbar = false;
	searchedText = "";
	constructor(
		public modalController: ModalController,
		private httpService: HttpService,
		public popoverCtrl: PopoverController
	) {}

	ngOnInit() {
		this.getOrders();
	}

	onChangeOfSearch() {
		const search = { search: this.searchedText };
		this.httpService
			.posts(search, "bottle-card/orders")
			.subscribe((res: any) => {
				console.log(res);
				this.orders = res.data.info.data;
			});
	}

	async presentPopover(event: Event) {
		const popover = await this.popoverCtrl.create({
			component: PopoverPage,
			event,
		});
		await popover.present();
		const { data } = await popover.onDidDismiss();
		const order = { filter: data };
		this.httpService
			.posts(order, "bottle-card/orders")
			.subscribe((res: any) => {
				console.log(res);

				this.orders = res.data.info.data;
			});
	}

	onChangeOfOrder($event) {
		const order = { filter: $event.target.value };
		console.log(order);

		this.httpService
			.posts(order, "bottle-card/orders")
			.subscribe((res: any) => {
				console.log(res);

				this.orders = res.data.info.data;
			});
	}
	getOrders() {
		this.httpService.posts("", "bottle-card/orders").subscribe((res: any) => {
			this.orders = res.data.info.data;
			console.log(this.orders);

			console.log("calll");
		});
	}
	async addOrder() {
		const modal = await this.modalController.create({
			component: OrderTypeComponent,
			componentProps: { value: 123 },
		});

		modal.onDidDismiss().then((data) => {
			console.log(data);
			this.getOrders();
		});

		return await modal.present();
	}

	async onClickOfEdit(id) {
		console.log(id);

		const modal = await this.modalController.create({
			component: AddOrderComponent,
			componentProps: { id: id, value: "regular" },
		});

		modal.onDidDismiss().then((data) => {
			console.log(data);
			this.getOrders();
		});

		return await modal.present();
	}

	onClickOfDetails() {
		console.log("hello");
	}

	async onClickViewOrder(id) {
		const modal = await this.modalController.create({
			component: ViewOrderComponent,
			componentProps: { value: id },
		});

		modal.onDidDismiss().then((data) => {
			console.log(data);
		});

		return await modal.present();
	}
}
