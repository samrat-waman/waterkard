import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { CoreService } from '../../service/core.service';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  reseller = {
    name: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pin: "",
    email: "",
    phone: "",

  };
  myInfo = [];
  constructor(private httpService: HttpService, private coreService: CoreService) { }

  ngOnInit() {
    this.getDetails()
  }

  getDetails() {
    this.httpService.get('', 'user/me').subscribe((res: any) => {
      console.log(res);

      this.reseller = res.data.me;
      this.reseller.country = res.data.me.address[0].country;
      this.reseller.state = res.data.me.address[0].state;
      this.reseller.city = res.data.me.address[0].city;

    })
  }
  onClickOfSubmit() {
    console.log(this.reseller);

    this.httpService.posts(this.reseller, 'user/update').subscribe((res: any) => {
      this.coreService.presentToast(false);
      console.log(res);
    });


  }
}
