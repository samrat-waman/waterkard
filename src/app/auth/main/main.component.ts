import { Component, OnInit } from '@angular/core';
import {  MenuController } from '@ionic/angular';
import {Router} from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  constructor(public menuCtrl: MenuController, private router: Router) { }

  ngOnInit() {}
  ionViewDidEnter() {
    this.menuCtrl.enable(false);
 }
 ionViewDidLeave() {
    this.menuCtrl.enable(true);
 } 
 onClickOfVendorLogin(){
  this.router.navigate(['/auth/vendor-login']);
 }

onClickOfDriverLogin(){
this.router.navigate(['/auth/driver-login']);
 }
onClickOfRegister(){
this.router.navigate(['/auth/register']);

}
}
