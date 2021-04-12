import { HttpService } from 'src/app/service/http.service';
import { NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.page.html',
  styleUrls: ['./notification-detail.page.scss'],
})
export class NotificationDetailPage implements OnInit {
  notification: any;

  constructor(private navParams: NavParams, private httpService: HttpService) { }

  ngOnInit() {
    this.notification = this.navParams.data['notification'];
    this.httpService.posts({in_app_notification_id: this.notification.in_app_notification_id}, 'notification/mark-read')
    .subscribe();
  }
}
