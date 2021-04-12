import { Component, OnInit } from "@angular/core";
import { CardEditComponent } from "../card-edit/card-edit.component";
import { ModalController } from "@ionic/angular";
import { HttpService } from "../../service/http.service";

@Component({
	selector: "app-card-list",
	templateUrl: "./card-list.component.html",
	styleUrls: ["./card-list.component.scss"],
})
export class CardListComponent implements OnInit {
	showSearchbar = false;
	searchedText = "";

	cards = [];
	selectedTab = "regular";
	// regularCustomer = [];
	// eventOrganizer = [];
	dailyTotalSold = 0;
	dailyTotalEmpty = 0;
	dailyTotalBalance = 0;
	constructor(
		public modalController: ModalController,
		private httpService: HttpService
	) {}

	ngOnInit() {
		console.log("hello");

		this.getCard();
	}

	onChangeOfSearch() {
		const search = { search: this.searchedText };
		this.httpService.posts(search, "bottle-card/list").subscribe((res: any) => {
			console.log(res);
			this.cards = res.data.info.data;
		});
	}

	getCard() {
		// this.regularCustomer = [];
		// this.eventOrganizer = [];
		this.httpService.posts("", "bottle-card/list").subscribe((res: any) => {
			console.log(res);
			this.cards = res.data.info.data;
			console.log(this.cards);

			this.dailyTotalSold = 0;
			this.dailyTotalEmpty = 0;
			this.dailyTotalBalance = 0;
			this.cards.forEach((element: any) => {
				// if (element.customer_type == "regular") {
				// this.regularCustomer.push(element);

				this.dailyTotalSold =
					this.dailyTotalSold + parseInt(element.today_sold);
				this.dailyTotalEmpty =
					this.dailyTotalEmpty + parseInt(element.today_empty);
				this.dailyTotalBalance =
					this.dailyTotalBalance + parseInt(element.balance_jar);
				// } else {
				// 	this.eventOrganizer.push(element);

				// }
			});
			// console.log(this.regularCustomer);
			// console.log(this.eventOrganizer);
		});
	}

	get customers() {
		return (
			this.cards.filter(
				(customer) => customer.customer_type === this.selectedTab
			) || []
		);
	}

	async onClickOfAdd(id) {
		const modal = await this.modalController.create({
			component: CardEditComponent,
			componentProps: { value: id },
		});

		modal.onDidDismiss().then((data) => {
			console.log(data);
			this.getCard();
		});

		return await modal.present();
	}
}
