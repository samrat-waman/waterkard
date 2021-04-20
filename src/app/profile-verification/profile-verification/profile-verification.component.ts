import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
// import { FullScreenImageOriginal } from '@ionic-native/full-screen-image';
@Component({
  selector: 'app-profile-verification',
  templateUrl: './profile-verification.component.html',
  styleUrls: ['./profile-verification.component.scss'],
})
export class ProfileVerificationComponent implements OnInit {
  showSearchbar = false;
  searchedText
  drivers = [];
  constructor(private httpService: HttpService, private photoViewer: PhotoViewer) { }

  ngOnInit() {
    this.getDrivers()
  }
  onClickOfImage(id, img) {

    // this.fullScreen.showImageURL('/assets/...')
    //   .then((data: any) => console.log("hello"))
    //   .catch((error: any) => console.error(error));

  }

  getDrivers() {
    this.httpService.posts('', 'driver/list').subscribe((res: any) => {
      this.drivers = res.data.info.data;
      console.log(this.drivers);


    })

  }

  clickImage(image) {
    console.log("image clicked", image);
    this.photoViewer.show(image);
  }


  onChangeOfSearch() { }

}
