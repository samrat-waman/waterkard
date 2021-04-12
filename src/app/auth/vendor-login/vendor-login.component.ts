import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "../../service/http.service";
import { NavController } from "@ionic/angular";
import { LoadingController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { CoreService } from "src/app/service/core.service";

@Component({
	selector: "app-vendor-login",
	templateUrl: "./vendor-login.component.html",
	styleUrls: ["./vendor-login.component.scss"],
})
export class VendorLoginComponent implements OnInit {
	login = { username: "", password: "" };
	showErrorMessage = true;
	token: "";
	role: any;
	errorMessages: Array<string> = [];

	constructor(
		private router: Router,
		private httpService: HttpService,
		private navController: NavController,
		private storage: Storage,
		public loadingController: LoadingController,
		public alertController: AlertController,
		private coreService: CoreService
	) { }

	ngOnInit() {
		this.errorMessages.push("ngOninit");
	}
	onClickOfLogin() {
		this.errorMessages.push("On click of login clicked");

		this.presentLoading();
		this.errorMessages.push("after present loading");

		this.httpService.posts(this.login, "login").subscribe(
			(res: any) => {
				this.errorMessages.push("login completed");

				this.token = res.data.token;
				this.role = res.data.role;
				// debugger;
				// if (this.role == "driver") {
				this.coreService.setDriverState(this.role === "driver");
				this.coreService.setVendorState(this.role === "vendor");
				this.httpService.setToken(this.token);
				// this.httpService.isDriver();
				// }
				this.httpService
					.set("role", this.role)
					.then((result) => {
						console.log("Data is saved");
					})
					.catch((e) => {
						console.log("error: " + e);
					});

				this.httpService
					.set("token", this.token)
					.then((result) => {
						console.log("Data is saved");
						// this.loadingController?.dismiss();
						if (this.token) {
							this.router.navigate(["Cards"]);
						} else {
							this.loginFailed();
						}
					})
					.catch((e) => {
						console.log(e);
					});

				// localStorage.setItem("token", this.token);
			},
			(error) => {
				this.errorMessages.push(error);
				this.loadingController?.dismiss();
			}
		);
	}

	do_something($event) {
		const name = $event.target.name;
		switch (name) {
			case "user": {
				this.login.username = $event.target.value;

				break;
			}
			case "password": {
				this.login.password = $event.target.value;
				break;
			}
		}
	}

	async loginFailed() {
		const alert = await this.alertController.create({
			cssClass: "my-custom-class",
			header: "Login Failed",
			subHeader: "Please try again",
			buttons: ["OK"],
		});

		await alert.present();
	}

	async presentLoading() {
		console.log("i am loading");
		this.errorMessages.push("started loading");

		const loading = await this.loadingController.create({
			cssClass: "my-custom-class",
			message: "Please wait...",
			duration: 1000,
		});
		this.errorMessages.push("after starting loading");

		await loading.present();
		this.errorMessages.push("after await loading");
	}
}
