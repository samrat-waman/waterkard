import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from "@ionic/angular";

@Component({
  selector: 'app-verification-status',
  templateUrl: './verification-status.component.html',
  styleUrls: ['./verification-status.component.scss'],
})
export class VerificationStatusComponent implements OnInit {
  id: any;
  name = ''
  constructor(private navParmas: NavParams, private modalCtrl: ModalController) { }

  ngOnInit(

  ) {
    this.id = this.navParmas.data.id;
    this.name = this.navParmas.data.value;
    console.log(this.name);

  }
  onClickOfVerify() {
    this.modalCtrl.dismiss();
  }
  onClickOfUnverify() {
    this.modalCtrl.dismiss();
  }
}
