import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingController: LoadingController) { }

  async showLoader(message = 'Loading...') {
    const loading = await this.loadingController.create({
      message,
      spinner: 'bubbles'
    });
    await loading.present();
    return loading;
  }
}
