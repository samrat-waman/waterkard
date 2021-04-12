import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { HttpService } from "../../service/http.service";
import { FormControl, Validators } from "@angular/forms";
import { CoreService } from "../../service/core.service";
@Component({
	selector: "app-add-driver",
	templateUrl: "./add-driver.component.html",
	styleUrls: ["./add-driver.component.scss"],
})
export class AddDriverComponent implements OnInit {
	driver = {
		user_id: "",
		name: "",
		phone: "",
		email: "",
		address: "",
		pincode: "",
		password: "",
	};

	mobilePattern = /^((\\+91-?)|0)?[0-9]{10}$/;
	emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	emailFormControl = new FormControl("", [
		Validators.required,
		Validators.email,
	]);
	driverID: any;
	products = [];
	title = "Add New Driver";
	buttonName = "Submit";
	show = true;
	constructor(
		public modalCtrl: ModalController,
		private httpService: HttpService,
		private navParams: NavParams,
		private coreService: CoreService
	) {}

	ngOnInit() {
		this.driverID = this.navParams.data.value;
		this.driver.user_id = this.driverID;
		if (this.driverID) {
			this.show = false;
			this.title = "Edit Driver";
			this.buttonName = "Update";
			this.getSpecificDriver(this.driverID);
		} else {
			console.log("add");
		}
	}

	getSpecificDriver(id) {
		this.httpService
			.posts({ user_id: id }, "driver/info")
			.subscribe((res: any) => {
				console.log(res);
				(this.driver.name = res.data.info.name),
					(this.driver.phone = res.data.info.phone),
					(this.driver.email = res.data.info.email),
					(this.driver.address = res.data.info.address[0].area);
			});
	}
	onClickOfSubmit(form) {
		form.submitted = true;
		if (form.valid) {
			console.log(this.driver);
			if (this.driverID) {
				this.httpService
					.posts(this.driver, "driver/edit")
					.subscribe((res: any) => {
						if (res.is_error) {
							this.coreService.errorHandale();
						} else {
							this.coreService.presentToast(false);
						}
					});
			} else {
				this.driver.password = Math.random().toString(36).slice(-6);
				console.log(this.driver.password);
				this.httpService
					.posts(this.driver, "driver/create")
					.subscribe((res: any) => {
						if (res.is_error) {
							this.coreService.errorHandale();
						} else {
							this.coreService.presentToast(true);
						}
					});
			}
		}
	}

	onClickOfCancel() {
		this.modalCtrl.dismiss();
	}

	getValue($event) {
		const name = $event.target.name;
		switch (name) {
			case "name": {
				this.driver.name = $event.target.value;
				break;
			}
			case "mobile": {
				this.driver.phone = $event.target.value;
				break;
			}
			case "address": {
				this.driver.address = $event.target.value;
				break;
			}
			case "pin": {
				this.driver.pincode = $event.target.value;
				break;
			}

			case "email": {
				this.driver.email = $event.target.value;
				break;
			}
		}
	}
}
