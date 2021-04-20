import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { CoreService } from '../../service/core.service';
@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.scss'],
})
export class DriverProfileComponent implements OnInit {
  showUplodImage = false;
  driver = {
    name: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pin: "",
    email: "",
    phone: "",

  };

  uplodImage = {
    id_proof: null,
    address_proof: null

  }
  myInfo = [];
  constructor(private httpService: HttpService, private coreService: CoreService) { }

  ngOnInit() {
    this.getDetails()
  }

  uploadAddressProofImage(event) {
    console.log(event);
    // const img = <File>event.target.files[0];
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader);
      console.log('hello');

      console.log(reader.result);
      var imgs = reader.result;
      console.log(imgs)
      this.uplodImage.address_proof = imgs;
    };
    // console.log(img);
    // console.log(this.product);
  }

  uploadIdProofImage(event) {
    console.log(event);
    // const img = <File>event.target.files[0];
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader);
      console.log('hello');

      console.log(reader.result);
      var imgs = reader.result;
      console.log(imgs)
      this.uplodImage.id_proof = imgs;
    };
    // console.log(img);
    // console.log(this.product);
  }

  uplodDocument() {
    this.showUplodImage = true;
  }

  getDetails() {
    this.httpService.get('', 'user/me').subscribe((res: any) => {
      console.log(res);

      this.driver = res.data.me;
      this.driver.country = res.data.me.address[0].country;
      this.driver.state = res.data.me.address[0].state;
      this.driver.city = res.data.me.address[0].city;

    })
  }
  onClickOfSubmit() {
    console.log(this.uplodImage);



    console.log(this.driver);

    this.httpService.posts(this.driver, 'user/update').subscribe((res: any) => {
      this.coreService.presentToast(false);
      console.log(res);
    });
    if (this.showUplodImage) {

      this.httpService.posts(this.uplodImage, 'user/upload-document').subscribe((res: any) => {
        this.coreService.presentToast(true);
        console.log(res);

      });
    }


  }
}