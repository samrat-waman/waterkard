import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { HttpService } from "../../service/http.service";
import { Router } from "@angular/router";
import { CoreService } from "../../service/core.service";
@Component({
  selector: 'app-unload-inventory',
  templateUrl: './unload-inventory.component.html',
  styleUrls: ['./unload-inventory.component.scss'],
})
export class UnloadInventoryComponent implements OnInit {

  unload_inventory = {
    driver_user_id: '',
    unloaded_jar: ''
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

    this.unload_inventory.driver_user_id = this.navParams.data.id;

  }



  getJar($event) {
    console.log($event.target.value);

    this.unload_inventory.unloaded_jar = $event.target.value;
  }

  onClickOfSubmit() {
    console.log(this.unload_inventory);

    console.log(this.unload_inventory);
    this.httpService
      .posts(this.unload_inventory, "inventory/unload-jar")
      .subscribe((res: any) => {
        console.log(res);
        this.coreService.presentToast(true);
      });
  }

  onClickOfCancel() {
    this.modalCtrl.dismiss();
  }
}
