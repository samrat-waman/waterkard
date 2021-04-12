import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'; 
import {HttpService} from '../../service/http.service';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-driver-login',
  templateUrl: './driver-login.component.html',
  styleUrls: ['./driver-login.component.scss'],
})
export class DriverLoginComponent implements OnInit {
  login={ username: '',
  password:''};
  showErrorMessage= true;
  token:'';
  
    constructor(private router: Router, private httpService: HttpService,private navController: NavController,
      public loadingController: LoadingController, public alertController: AlertController) { }
  
    ngOnInit() {}
    onClickOfLogin(){  
      this.presentLoading();
      
     this.httpService.posts(this.login, 'login').subscribe((res: any)=>{
      this.token=res.data.token;
      // localStorage.setItem('token', this.token);
      if(this.token)
      {   
        this.loadingController.dismiss();
        this.router.navigate(['\Cards']); 
            }
            else{
            this.loginFailed();
      }
    })
    }
  
    do_something($event) { 
      const name=$event.target.name;
      switch (name) {
        case "user": {
          this.login.username=$event.target.value;
          
          break;
        }
        case "password": {
          this.login.password=$event.target.value;
          break;
        }
      }
    
    }
    
    async loginFailed() { 
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Login Failed',
        subHeader: 'Please try again',
        buttons: ['OK']
      });
  
       await alert.present();
    }

    async presentLoading() {
      console.log("i am loading");
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
        duration: 500
      });
  
      await loading.present();
  
    }
  
  }