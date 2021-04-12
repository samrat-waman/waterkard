import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { HttpService } from "../../service/http.service";
import { Router } from "@angular/router";
import { CoreService } from "../../service/core.service";
@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss'],
})
export class AddInventoryComponent implements OnInit {
  allCustomers = [];

  inventory = {
    driver_user_id: '',
    inventory: ''
  }

  show = true;
  dates: any;
  id = "";
  role: any;
  drivers = [];

  constructor(
    public modalCtrl: ModalController,
    private httpService: HttpService,
    private router: Router,
    private navParams: NavParams,
    private coreService: CoreService
  ) { }

  ngOnInit() {
    this.getDrivers();
    // this.id = this.navParams.data.id;
    // if (this.id) {
    //   this.show = false;
    //   this.role = this.navParams.data.value;
    // } else {
    //   this.role = this.navParams.data.value;
    // }
  }

  getDrivers() {
    this.httpService.posts("", "driver/list").subscribe((res: any) => {
      this.drivers = res.data.info.data;

    });
  }
  getValue($event) {
    this.inventory.driver_user_id = $event.target.value;
  }
  getJar($event) {
    console.log($event.target.value);

    this.inventory.inventory = $event.target.value;
  }

  onClickOfSubmit() {
    console.log(this.inventory);
    this.httpService
      .posts(this.inventory, "inventory/create")
      .subscribe((res: any) => {
        console.log(res);
        this.coreService.presentToast(true);
      });
    // if (this.id) {
    //   console.log(this.order);
    //   console.log("hello");
    //   this.httpService
    //     .posts(this.order, "bottle-card/edit")
    //     .subscribe((res: any) => {
    //       this.coreService.presentToast(false);
    //     });
    // } else {
    //   this.httpService
    //     .posts(this.order, "bottle-card/add")
    //     .subscribe((res: any) => {
    //       this.coreService.presentToast(true);
    //     });
    // }
  }

  onClickOfCancel() {
    this.modalCtrl.dismiss();
  }
}

