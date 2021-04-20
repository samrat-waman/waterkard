import { HttpService } from "../../service/http.service";
import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Html2canvasService } from "../../service/html2canvas.service";
@Component({
	selector: "app-invoice",
	templateUrl: "./invoice.component.html",
	styleUrls: ["./invoice.component.scss"],
})
export class InvoiceComponent {
	@ViewChild("TABLE", { static: false }) TABLE: ElementRef;
	title = "Excel";
	month: any;
	year: any;
	totalProductPrice = 0;
	totalJarQuantity = 0;
	bottleCard = [];
	orderTotal = 0;
	orderTotalQuantity = 0;
	vendorDetails = { name: '', vendor: { address_line1: '', address_line2: '' }, phone: '' };
	customerDetails = { name: '', customer: { address: '', pending_payment: '' }, phone: '', };
	showStatement = false;
	statement = {
		customer_user_id: "",
		from_date: "",
		to_date: "",
	};
	customers = [];
	bottleCardStatement = [];
	htmlSample: any;
	img
	constructor(private httpService: HttpService, private pdfGenerator: PDFGenerator, private html2canvas: Html2canvasService) { }

	ngOnInit() {
		var today = new Date();
		this.statement.to_date = this.formatDate(today);
		this.statement.from_date = this.year + "-" + this.month + "-" + 1;
		console.log(this.statement.from_date);

		// date.slice(0, 10)

		this.getCustomers();

	}
	// generatePDF() {
	// 	const element = document.getElementById('html2canvas');
	// 	const targetElement = document.getElementById('target').cloneNode(true);
	// 	element.appendChild(targetElement);
	// 	this.html2canvas.html2canvas(element.firstChild).then((img) => {
	// 		this.img = img;
	// 		element.firstChild.remove();
	// 	}).catch((res) => {
	// 		console.log(res);
	// 	});
	// }
	generatePDF() {
		print();
		// var data = document.getElementById('containToConvert');
		// html2canvas(data).then(canvas => {
		// 	var imgWidth = 208;
		// 	var imgHeight = canvas.height * imgWidth / canvas.width;
		// 	const contentDataURL = canvas.toDataURL('image/png')
		// 	let pdf = new jspdf('p', 'mm', 'a4');
		// 	var position = 0;
		// 	pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
		// 	pdf.save('invoice.pdf');
		// });
	}

	getValue($event) {
		console.log(this.statement);
		this.statement.customer_user_id = $event.target.value;
		this.getStatement();

	}

	getStatement() {
		this.httpService.posts(this.statement, 'report/customer-bottlecard-statement').subscribe((res: any) => {
			this.showStatement = true
			this.bottleCardStatement = res.data.info.customer_products;

			this.vendorDetails = res.data.info.vendor_details;
			this.customerDetails = res.data.info.customer_details;

			console.log(this.bottleCardStatement);
			this.orderTotal = 0;
			this.orderTotalQuantity = 0;
			this.bottleCardStatement.forEach((res) => {
				this.orderTotal = this.orderTotal + parseInt(res.bottle_card.amount);
				this.orderTotalQuantity = this.orderTotalQuantity + parseInt(res.bottle_card.sold_quantity)
			})

			this.bottleCardStatement.forEach(ele => {
				let qty = 0;
				ele.bottle_card.map(bottleCard => {
					qty = qty + bottleCard.sold_quantity;
				});
				this.totalJarQuantity += ele.quantity = qty;
				this.totalProductPrice += ele.product_price = ele.quantity * ele.rate;

			})
		})
	}







	formatDate(date) {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),

			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;
		this.month = month;
		this.year = year;
		return [year, month, day].join("-");
	}

	parseFromDate(dateString: string): Date {
		if (dateString) {
			this.statement.from_date = dateString;
			const todaysDate = new Date(dateString);
			console.log(todaysDate);
		}
		return null;
	}
	parseToDate(dateString: string): Date {
		if (dateString) {
			this.statement.to_date = dateString;
			const todaysDate = new Date(dateString);
			console.log(todaysDate);
		}
		return null;
	}
	getCustomers() {
		const today = new Date();

		this.httpService.posts("", "customer/list").subscribe((res: any) => {
			console.log(res);
			this.customers = res.data.info.data;
		});
	}


}
