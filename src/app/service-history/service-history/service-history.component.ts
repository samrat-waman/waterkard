import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
@Component({
  selector: 'app-service-history',
  templateUrl: './service-history.component.html',
  styleUrls: ['./service-history.component.scss'],
})
export class ServiceHistoryComponent implements OnInit {
  serviceHistory = [];
  engineerName
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getServiceHistory();
  }

  getServiceHistory() {
    this.httpService.posts('', 'job/list').subscribe((res: any) => {
      this.serviceHistory = res.data.info.data;
      this.serviceHistory.forEach(element => {
        this.httpService.posts({ user_id: element.user_id }, 'fieldengineer/info').subscribe((res: any) => {
          element.engineerName = res.data.info.name;
          console.log(res);
        })

      });

    })
  }
}
