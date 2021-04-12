import { Component } from "@angular/core";
import { HttpService } from "../../service/http.service";
import { PopoverController } from "@ionic/angular";

@Component({
	template: `
		<ion-list>
			<ion-item button (click)="close('today_orders')">
				<ion-label>Today's Orders</ion-label>
			</ion-item>
			<ion-item button (click)="close('upcoming_orders')">
				<ion-label>Upcoming Orders</ion-label>
			</ion-item>
			<ion-item button (click)="close('previous_orders')">
				<ion-label>Previous Orders</ion-label>
			</ion-item>
		</ion-list>
	`,
})
export class PopoverPage {
	constructor(
		public popoverCtrl: PopoverController,
		private httpService: HttpService
	) {}

	support() {
		// this.app.getRootNavs()[0].push('/support');
		this.popoverCtrl.dismiss();
	}

	close(url: string) {
		// const order={}
		// this.httpService
		// 	.posts(order, "bottle-card/orders")
		// 	.subscribe((res: any) => {
		// 		console.log(res);

		// 		this.orders = res.data.info.data;
		// 	});
		// window.open(url, "_blank");
		this.popoverCtrl.dismiss(url);
	}
}
