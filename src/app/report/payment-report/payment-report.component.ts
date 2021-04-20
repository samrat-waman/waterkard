import { HttpService } from "../../service/http.service";
import { Component, ElementRef, ViewChild, OnInit } from "@angular/core";
@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrls: ['./payment-report.component.scss'],
})
export class PaymentReportComponent implements OnInit {

  @ViewChild("TABLE", { static: false }) TABLE: ElementRef;
  title = "Excel";
  month: any;
  year: any;

  report = {
    customer_user_id: "",
    from_date: "",
    to_date: "",
  };
  customers = [];
  paymentHistory = [];
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.report.from_date = "2020-5-3";
    var today = new Date();
    this.report.to_date = this.formatDate(today);
    this.report.from_date = this.year + "-" + this.month + "-" + 1;
    console.log(this.report.from_date);

    // date.slice(0, 10)

    this.getCustomers();
  }
  ExportTOExcel() {
    print();
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
    // 	this.TABLE.nativeElement
    // );
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // XLSX.writeFile(wb, "report.xlsx");
  }
  getValue($event) {
    console.log(this.report);
    this.report.customer_user_id = $event.target.value;
    this.getReports();

  }
  getReports() {
    this.httpService
      .posts(this.report, "bottle-card-payment/history")
      .subscribe((res: any) => {
        this.paymentHistory = res.data.info.data;
        console.log(this.paymentHistory);
      });

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
      this.report.from_date = dateString;
      const todaysDate = new Date(dateString);
      console.log(todaysDate);
    }
    return null;
  }
  parseToDate(dateString: string): Date {
    if (dateString) {
      this.report.to_date = dateString;
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