import { HttpService } from "../../service/http.service";
import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss'],
})
export class StatementComponent implements OnInit {
  @ViewChild("TABLE", { static: false }) TABLE: ElementRef;
  title = "Excel";
  month: any;
  year: any;
  totalPaid;
  // orderTotal = 0;
  totalJarQuantity = 0;
  totalJarAmount = 0;
  paidAmountByCustomer = [];
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
  constructor(private httpService: HttpService, private pdfGenerator: PDFGenerator,) { }

  ngOnInit() {
    var today = new Date();
    this.statement.to_date = this.formatDate(today);
    this.statement.from_date = this.year + "-" + this.month + "-" + 1;
    console.log(this.statement.from_date);

    // date.slice(0, 10)

    this.getCustomers();

  }

  generatePDF() {
    var data = document.getElementById('containToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('statement.pdf');
    });
  }

  getPDF() {

    this.htmlSample = "<html><h1>Converted from HTML</h1></html>";
    let options = {
      documentSize: 'A4',
      type: 'share'
    }

    this.pdfGenerator.fromData(this.htmlSample, options).
      then(resolve => {
        console.log(resolve);

      }
      ).catch((err) => {
        console.error(err);
      });
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
      this.customerDetails = res.data.info.customer_details;
      this.vendorDetails = res.data.info.vendor_details;
      console.log(res.data.info);
      this.paidAmountByCustomer = res.data.info.payment_details;
      this.totalPaid = this.paidAmountByCustomer.reduce((acc, val) => acc += parseInt(val.payment_amount), 0)
      // this.orderTotal = 0;
      // this.orderTotalQuantity = 0;
      // this.bottleCardStatement.forEach((res) => {
      //   this.orderTotal = this.orderTotal + parseInt(res.bottle_card.amount);
      //   this.orderTotalQuantity = this.orderTotalQuantity + parseInt(res.bottle_card.sold_quantity)
      // })

      this.bottleCardStatement.forEach(ele => {
        let [qty, amount] = [0, 0];
        ele.bottle_card.map(bottleCard => {
          qty = qty + bottleCard.sold_quantity;
          amount = amount + +bottleCard.amount;
        });
        this.totalJarQuantity += ele.quantity = qty;
        this.totalJarAmount += ele.amount = amount;
      })
    })
  }

  // get totalJarQuantity() {
  //   return 0;
  // }





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
