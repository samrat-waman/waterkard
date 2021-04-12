import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "../../service/http.service";
import { FormControl, Validators } from "@angular/forms";
import { CoreService } from "../../service/core.service";
@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
	reseller = {
		name: "",
		address: "",
		country: "",
		state: "",
		city: "",
		pin: "",
		email: "",
		phone: "",
		password: "",
		confirm_password: "",
	};
	show = false;
	constructor(
		private router: Router,
		private httpService: HttpService,

		private coreService: CoreService
	) {}

	ngOnInit() {}

	onClickOfSignup(form) {
		form.submitted = true;

		if (form.valid) {
			console.log(this.reseller);
			if (this.reseller.password === this.reseller.confirm_password) {
				this.httpService
					.posts(this.reseller, "register")
					.subscribe((res: any) => {
						if (res.is_error) {
							this.coreService.errorHandale();
						} else {
							this.coreService.presentToast(true);
							this.router.navigate(["/auth"]);
						}
					});
			} else {
				this.show = true;
			}
		}
	}
}
