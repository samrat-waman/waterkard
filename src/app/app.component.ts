import { Component, OnInit } from "@angular/core";
import { HttpService } from "./service/http.service";
import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
// import { getNumberOfCurrencyDigits } from "@angular/common";
import { CoreService } from "./service/core.service";
@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
	styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
	public selectedIndex = 0;
	hide = true;
	driver = true;
	// appPages: Array<{
	// 	title: string;
	// 	url: string;
	// 	icon: string;
	// 	isVisible: boolean;
	// }> = [];
	// appPages = [
	//   {
	//     title: 'Cards',
	//     url: '/Cards',
	//     icon: 'card',
	//     isVisible: this.hide
	//   },
	//   {
	//     title: 'My Products',
	//     url: '/Product',
	//     icon: 'beaker',
	//      isVisible: this.httpService.driver
	//   },
	//   {
	//     title: 'Customers',
	//     url: '/Customers',
	//     icon: 'people',
	//     isVisible: this.hide
	//   },
	//   {
	//     title: 'Drivers',
	//     url: '/Drivers',
	//     icon: 'car',
	//     isVisible: this.httpService.driver
	//   },
	//   {
	//     title: 'Orders',
	//     url: '/Orders',
	//     icon: 'cart',
	//     isVisible: this.hide
	//   },
	//   {
	//     title: 'Payment',
	//     url: '/Payment',
	//     icon: 'wallet',
	//     isVisible: this.hide
	//   },
	//   {
	//     title: 'Dispensers',
	//     url: '/Dispensers',
	//     icon: 'beaker',
	//     isVisible: this.hide
	//   },
	//   {
	//     title: 'Deposit',
	//     url: '/Deposit',
	//     icon: 'cash',
	//     isVisible: this.hide
	//   },
	//   {
	//     title: 'Logout',
	//     url: '/auth',
	//     icon: 'power',
	//     isVisible: this.hide
	//   },
	//   {
	//     title: 'Call Us 8888888888',
	//     url: '/a',
	//     icon: 'call',
	//     isVisible: this.hide
	//   }
	// ];

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private httpService: HttpService,
		private coreService: CoreService
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	ngOnInit() {
		console.log(this.httpService.driver);

		// this.userMe();
		const path = window.location.pathname.split("folder/")[1];
		// if (path !== undefined) {
		// 	this.selectedIndex = this.appPages.findIndex(
		// 		(page) => page.title.toLowerCase() === path.toLowerCase()
		// 	);
		// }
	}

	// Ctrl + A -- Ctrl + K ---- Ctrl + F
	get getRoutes() {
		return this.coreService.getRoutes();
	}

	// userMe() {
	// 	this.httpService.get("user/me").subscribe((res: any) => {
	// 		console.log(res);

	// 		if (res.data.role.slug == "driver") {
	// 			console.log(" vaibhavaaa");
	// 		}
	// 	});
	// }
}
