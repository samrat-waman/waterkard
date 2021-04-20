import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { AddInventoryComponent } from '../add-inventory/add-inventory.component';
import { HttpService } from "../../service/http.service";
import { UnloadInventoryComponent } from '../unload-inventory/unload-inventory.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  inventory = {
    driver_user_id: '',
    date: ''
  }
  inventoryDetails = {
    today_loaded: '',
    today_calculated_jar_unloaded: '',
    today_delivered: '',
    today_empty_collected: '',
    today_return_filled: '',
    total_delivered: '',
    total_empty_collected: '',
    total_loaded: '',
    total_unloaded: '',
    today_unloaded: ''
  };
  showInventoryDetails = false;
  today: any;
  drivers = [];
  constructor(
    public modalController: ModalController,
    private httpService: HttpService,

  ) { }

  ngOnInit() {
    this.getDrivers();
  }

  getInventoryDetails() {
    this.showInventoryDetails = true;
    console.log(this.inventory);
    this.httpService.posts(this.inventory, "inventory/driver-inventory").subscribe((res: any) => {
      this.inventoryDetails = res.data.details;
      console.log(this.inventoryDetails);
    });

  }

  async unloadJar() {
    const modal = await this.modalController.create({
      component: UnloadInventoryComponent,
      componentProps: { id: this.inventory.driver_user_id },
    });

    modal.onDidDismiss().then((data) => {
      this.getInventoryDetails();
    });
    return await modal.present();
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      this.inventory.date = dateString;
      const todaysDate = new Date(dateString);
      console.log(todaysDate);
      this.getInventoryDetails();
    }
    return null;
  }
  async onClickOfAdd() {
    const modal = await this.modalController.create({
      component: AddInventoryComponent,
      componentProps: { value: 0 },
    });

    modal.onDidDismiss().then((data) => {
      this.getInventoryDetails();
    });
    return await modal.present();
  }
  getDate($event) {
    const date = $event.detail.value;
    this.inventory.date = date.slice(0, 10);
    this.getInventoryDetails();
  }

  getValue($event) {
    this.inventory.driver_user_id = $event.target.value;
    this.getInventoryDetails()
  }
  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  getDrivers() {
    this.today = new Date().toJSON().split("T")[0];

    this.inventory.date = this.formatDate(this.today);
    this.httpService.posts("", "driver/list").subscribe((res: any) => {
      this.drivers = res.data.info.data;

    });
  }
}
