import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { ToastController } from "@ionic/angular";
import { ModalController, NavParams } from "@ionic/angular";

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.scss'],
})
export class ServiceRequestComponent implements OnInit {
  serviceRequest = {
    complaint_text: '',
    description: '',
    job: null,
    complaint_images: []
  }
  constructor(private httpService: HttpService, public toastController: ToastController, public modalCtrl: ModalController,) { }

  ngOnInit() { }
  onClickOfSubmit() {
    console.log(this.serviceRequest);
    this.httpService.posts(this.serviceRequest, 'complaint/create').subscribe((res: any) => {
      console.log(res);
      if (res.is_error) {
        console.log("Problem to sending Feedback");
      }
      else {

        this.succesfullySendMessage();



      }

    })

  }

  uplodImage(event) {
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
      this.serviceRequest.complaint_images.push(imgs);
    };
    // console.log(img);
    // conso
  }

  async succesfullySendMessage() {
    const toast = await this.toastController.create({
      message: "successfully sent",
      duration: 2000,
      position: "bottom",
    });
    toast.present();
    this.modalCtrl.dismiss();

    this.serviceRequest.complaint_text = ''
    this.serviceRequest.description = ''
    this.serviceRequest.job = ''
    this.serviceRequest.complaint_images = []


  }

  onClickOfCancel() {
    this.serviceRequest.complaint_text = ''
    this.serviceRequest.description = ''
    this.serviceRequest.job = ''
    this.serviceRequest.complaint_images = []

  }
}
