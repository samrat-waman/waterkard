import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
@Component({
  selector: 'app-inactive-customer',
  templateUrl: './inactive-customer.component.html',
  styleUrls: ['./inactive-customer.component.scss'],
})
export class InactiveCustomerComponent implements OnInit {
  customers = [];
  inactiveCustomers = [];
  constructor(private httpService: HttpService
  ) { }

  ngOnInit() {

    this.getCustomers();
  }
  getCustomers() {
    this.httpService.posts("", "customer/list").subscribe((res: any) => {
      console.log(res.data.info.data);
      this.customers = res.data.info.data;
      console.log("calll");
      this.inactiveCustomers = this.customers.filter(customer => {
        customer.is_active > 0;
      });
    });
  }


}