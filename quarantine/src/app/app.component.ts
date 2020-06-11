import { Component } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';

import { Platform ,AlertController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRatingService } from 'src/app/services/app-rating/app-rating.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private appRating: AppRatingService,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public alertController: AlertController,
    private fcm: FCM,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.fcm.getToken().then(token => {
        console.log(token);
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        console.log(token);
      });

      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          this.router.navigate(['notification']);
        } else {
          this.router.navigate(['notification']);
        }
      });
    });
  }

  ngOnInit(){


    this.fcm.onTokenRefresh().subscribe(token => {
      console.log("Refreshed Token is : " + token);
      let postdata = {
        "client_id": "007",
        "FcmKey": "" + token
      };
      // this.http.post("http://35.165.61.223:3000/RegisterClient", postdata).subscribe(data => {
      //   //DATA
      // }, error => {
      //   //ERROR
      // });
    });





    this.fcm.onNotification().subscribe(data => {
      console.log("Data recieved is : ", data);

if(data.payload == "ratingPopup" ) 
{

  this.appRating.getrating();


}

else if(data.payload == "messege"){
  this.showAlert(data.messege)
}

else if(data.payload == "update"){
let AppVersion
  if(this.compareVersions(AppVersion,data.version)){
    this.showUpdate();
  }
}

else{
  if (data.wasTapped) {


  }
  else{

  }

}



     })

 }


 async showAlert(msg) {
  const alert = await this.alertController.create({
    message: msg,
    buttons: ['OK']
  });
  alert.present();
}



compareVersions(now, latest) {
  if (latest) {
    if (now == latest) {
      return false
    }
    else {
      let a = latest.split(".")
      let b = now.split(".")
      if (a.length == b.length) {
        let len = a.length
        for (let i = 0; i < len; i++) {
          if (a[i] > b[i]) {
            return true;
          }
          else
            if (a[i] < b[i]) {
              return false;
            }

        }

      }
    }
  }
  else {
    return false
  }

}

async showUpdate(){
  let alert = await this.alertController.create({
    message: 'Updates are available',
    subHeader: "Make sure you update your app soon to receive the best possible experience",
    buttons: [
      {
        text: 'Update Now',
        handler: () => {
          if (this.platform.is('android')) {
         //   window.open("https://play.google.com/store/apps/details?id=leejam.fitnesstime&hl=en", "_system");
          }
          if (this.platform.is('ios')) {
            // iOS
          //  window.open("itms-apps://itunes.apple.com/br/app/fitnesstime-app/id1455950113?mt=8", "_system");
          }
        }
      },
      {
        text: 'Later',
        handler: () => {
          this.alertController.dismiss()
        }
      }
    ]
  });
}




}
