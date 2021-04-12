import { NotificationDetailPage } from './../notification-detail/notification-detail.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  searchedText;
	showSearchbar = false;
  notifications = [];

  constructor(
    public modalController: ModalController,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.httpService.posts({}, 'notification/list')
    .subscribe((res: any) => {
      console.log(res);
      this.notifications = res.data.info.data;
    });
  }

  onChangeOfSearch() {
    
  }

  /**
   * TODO: Make not optional
   * @param notification 
   */
  async showNotification(notification?){
      const modal = await this.modalController.create({
      component: NotificationDetailPage,
      componentProps: { notification }
      });
      await modal.present();
  }
}
