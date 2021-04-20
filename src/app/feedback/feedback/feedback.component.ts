import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { ToastController } from "@ionic/angular";
import { ModalController, NavParams } from "@ionic/angular";
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  serviceEngineer = [];
  feedback =
    {
      feedback_user_id: '',
      rating: '',
      review_text: ''
    }
  constructor(private httpService: HttpService, public toastController: ToastController, public modalCtrl: ModalController) { }

  ngOnInit() {
    this.getUserInformation()
  }

  getUserInformation() {
    this.httpService.get('', 'user/me').subscribe((res: any) => {

      if (res.data.role.name == "Vendor") {
        this.getServiceEngineer()
      }
      else {
        this.getCustomers();
      }

    })
  }

  getCustomers() {

    this.httpService.posts('', 'customer/list').subscribe((res: any) => {

      this.serviceEngineer = res.data.info.data;
      console.log(this.serviceEngineer);

    })
  }


  getServiceEngineer() {

    this.httpService.posts('', 'fieldengineer/list').subscribe((res: any) => {

      this.serviceEngineer = res.data.info.data;
      console.log(this.serviceEngineer);

    })
  }
  onClickOfSubmit() {
    console.log(this.feedback);
    this.httpService.posts(this.feedback, 'user-feedback/create').subscribe((res: any) => {
      console.log(res);
      if (res.is_error) {
        console.log("Problem to sending Feedback");
      }
      else {
        this.succesfullySendMessage();
      }
    })
  }
  onClickOfCancel() {
    this.feedback.feedback_user_id = ''
    this.feedback.rating = ''
    this.feedback.review_text = ''

  }

  async succesfullySendMessage() {
    const toast = await this.toastController.create({
      message: "Thanks For Your Valuable Feedback",
      duration: 2000,
      position: "bottom",
    });
    toast.present();
    this.modalCtrl.dismiss();

    this.feedback.feedback_user_id = ''
    this.feedback.rating = ''
    this.feedback.review_text = ''


  }

  onRatingChange(rating) {
    console.log('The evaluation was modified and now its value is: ', rating);
    // do your stuff
  }

}
