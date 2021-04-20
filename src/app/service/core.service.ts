import { HttpService } from './http.service';
import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { ModalController, NavParams } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
const driver = 'driver';
const vendor = 'vendor';
@Injectable({
	providedIn: "root",
})
export class CoreService {
	constructor(
		public toastController: ToastController,
		public modalCtrl: ModalController,
		private alertController: AlertController,
		private httpService: HttpService
	) { }

	routes: Array<{
		title: string;
		url: string;
		icon: string;
		hideFrom: Array<string>;
	}> = [

			{
				title: "My Profile",
				url: "/Profile",
				icon: "profile",
				hideFrom: [driver],
			},
			{
				title: "Cards",
				url: "/Cards",
				icon: "card",
				hideFrom: [],
			},
			{
				title: "My Products",
				url: "/Product",
				icon: "water-bottle",
				hideFrom: [driver],
			},
			{
				title: "Customers",
				url: "/Customers",
				icon: "kyc",
				hideFrom: [],
			},
			{
				title: "Customer Groups",
				url: "/customer-groups",
				icon: "team",
				hideFrom: [driver],
			},
			{
				title: "Assigned Customer",
				url: "/Customers/assign-customer",
				icon: "team",
				hideFrom: [vendor],
			},
			{
				title: "Drivers",
				url: "/Drivers",
				icon: "driver",
				hideFrom: [driver],
			},
			{
				title: "Orders",
				url: "/Orders",
				icon: "tracking",
				hideFrom: [],
			},
			{
				title: "Payment",
				url: "/Payment",
				icon: "cash",
				hideFrom: [driver],
			},
			{
				title: "Dispensers",
				url: "/Dispensers",
				icon: "water-dispenser",
				hideFrom: [driver],
			},
			{
				title: "Deposit",
				url: "/Deposit",
				icon: "wallet",
				hideFrom: [driver],
			},
			{
				title: "Report",
				url: "/Report",
				icon: "report",
				hideFrom: [driver],
			},
			{
				title: "Payment-Report",
				url: "/Report/payment-report",
				icon: "report",
				hideFrom: [driver],
			},

			{
				title: "Invoice",
				url: "/Invoice",
				icon: "invoice",
				hideFrom: [driver],
			},
			{
				title: "Statement",
				url: "/Statement",
				icon: "file",
				hideFrom: [driver],
			},
			{
				title: "Inventory",
				url: "/Inventory",
				icon: "inventory",
				hideFrom: [driver],
			},
			{
				title: "Notifications",
				url: "/notifications",
				icon: "bell",
				hideFrom: [],
			},

			{
				title: "Inactive Users",
				url: "/Customers/inactive-customers",
				icon: "team",
				hideFrom: [],
			},
			{
				title: "Profile Verification",
				url: "/Profile-Verification",
				icon: "verification",
				hideFrom: [driver],
			},

			{
				title: "Service Request",
				url: "/Service-Request",
				icon: "customer-service",
				hideFrom: [driver],
			},
			{
				title: "Service History",
				url: "/Service-History",
				icon: "service",
				hideFrom: [driver],
			},
			{
				title: "Feedback",
				url: "/Feedback",
				icon: "feedback",
				hideFrom: [],
			},
			{
				title: "Help and Support",
				url: "/notifications",
				icon: "technical-support",
				hideFrom: [],
			},
			// {
			// 	title: "Shop",
			// 	url: "/shop",
			// 	icon: "logout",
			// 	hideFrom: [],
			// },
			{
				title: "Profile",
				url: "/Profile/driver-profile",
				icon: "profile",
				hideFrom: [vendor],
			},
			{
				title: "Logout",
				url: "/auth",
				icon: "logout",
				hideFrom: [],
			},
			{
				title: "Call Us 8888888888",
				url: "/a",
				icon: "customer-support",
				hideFrom: [],
			},
		];

	private isDriver: boolean = true;
	private isVendor: boolean = true;

	async setDriverState(state: boolean) {
		this.isDriver = await this.httpService.gett('role') === driver || state;
	}

	async setVendorState(state: boolean) {
		this.isVendor = await this.httpService.gett('role') === vendor || state;
	}

	getDriverState() {
		return this.isDriver;
	}

	getVendorState() {
		return this.isVendor;
	}

	async presentToast(status) {
		if (status) {
			const toast = await this.toastController.create({
				message: "Successfully Added.",
				duration: 2000,
				position: "bottom",
			});
			toast.present();
			this.modalCtrl.dismiss();
		} else {
			const toast = await this.toastController.create({
				message: "Successfully Updated",
				duration: 2000,
				position: "bottom",
			});

			toast.present();
			this.modalCtrl.dismiss();
		}
	}

	getRoutes() {
		if (this.isDriver) {
			return this.routes.filter((route) => !route.hideFrom.includes(driver));
		}
		if (this.isVendor) {
			return this.routes.filter((route) => !route.hideFrom.includes(vendor));
		}
		return this.routes;
	}

	async errorHandale() {
		const alert = await this.alertController.create({
			cssClass: "my-custom-class",
			header: "Number Already Exist",
			// subHeader: 'Subtitle',
			buttons: [
				{
					text: "Ok",
					role: "cancel",
					cssClass: "secondary",
					handler: () => {
						console.log("Confirm Cancel");
					},
				},
			],
		});
		await alert.present();
	}
}