import { Injectable } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
import { Platform, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { InAppReview } from '@ionic-native/in-app-review/ngx';
// import { askrating,askRatingdays } from '../../config';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AppRatingService {

  private askRating;
  private askRatingdays;
  
  constructor(
    private alertCtrl: AlertController,
    public platform: Platform,
    private inAppReview: InAppReview,
    private storage: Storage
    // private translateService : TranslateService
    ) { }

  getrating() {
    this.askRating = true;
    this.askRatingdays = 30;
    // this.translateService.get("RATINTXT").subscribe(val=>{
    this.checkDays().then(check=>{     //returns true if current date is after 30 days of stored date in storage 
      if(this.askRating && check){
          this.saveDate();
          if(this.platform.is("android")){
            this.AndroidRating('Rate Us');
          }
          else if(this.platform.is("ios") ){
              this.IosRating('Rate Us')
          }
        }
      //this.gotoAlert(val)
    })
// })
  }

 async AndroidRating(msg){
    //   let rateNowText,rateLaterText,enjoyFTText
    //   this.translateService.get("RATENOW").subscribe(val=>{
    //     rateNowText = val
    // })

    // this.translateService.get("RATELATER").subscribe(val=>{
    //   rateLaterText = val
    // })

    // this.translateService.get("ENJOYINGFT").subscribe(val=>{
    //   enjoyFTText = val
    // })

    const alert = await this.alertCtrl.create({
      header : 'Like this App? Rate us',
      message: msg,
      buttons: [
        {
          text: 'Rate Later',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Rate Now',
          handler: () => {
            if(this.platform.is("android"))
            {
              window.open('https://play.google.com/store/apps/details?id=leejam.fitnesstime&hl=en', '_system') 
             // window.open('market://developer?id=leejam.fitnesstime', '_system', 'location=yes');
            }
            else
            if(this.platform.is("ios"))
            {
              // Handle iOS
            }
          }
        }
      ]
    });

    await alert.present();
  }

  checkDays() {
    let promise = new Promise((resolve, reject) => {
      this.storage.get('ratingDays').then((val)=>{
        if(val){
          let timestored=  moment(val,'DD MM YYYY').add(30, 'days');
          resolve(moment().isAfter(moment(timestored), 'days'));
        }
        else{
          resolve(true)
        }
      });
    });
    return promise;
  }

  saveDate(){
   let DatetoShow= moment().format('DD MM YYYY');
    this.storage.set('ratingDays',DatetoShow);
  }

  IosRating(msg){
    this.inAppReview.requestReview()
      .then((res: any) => console.log(res))
      .catch((error: any) => console.error(error));
  }

}