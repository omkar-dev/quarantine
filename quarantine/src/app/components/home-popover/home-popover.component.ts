import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController,AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FeedbackComponent } from '../feedback/feedback.component';
import { AppRatingService } from 'src/app/services/app-rating/app-rating.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-popover',
  templateUrl: './home-popover.component.html',
  styleUrls: ['./home-popover.component.scss'],
})
export class HomePopoverComponent implements OnInit {
  persistentObj: {};

  constructor(private modalController : ModalController,
    private popoverController: PopoverController, private router: Router, private storage: Storage, 
    private appRating: AppRatingService,
    private translate: TranslateService,
    public alertController: AlertController
  ) { }

  ngOnInit() {}

  async openFeedback() {
    this.popoverController.dismiss();
    const modal = this.modalController.create({
      component: FeedbackComponent
    });
    return (await modal).present();
  }

  rating() {
    this.appRating.getrating();
    this.popoverController.dismiss();
  }

  logout() {
    this.storage.get('OnboardingShown').then(OnboardingShown=>{
    this.storage.get('VerifiedAccounts').then(VerifiedAccounts=>{
    this.storage.get('language').then(language=>{
    this.storage.get('user_store_verified').then(user_store_verified=>{
      this.storage.clear();
      this.storage.set('OnboardingShown',OnboardingShown);
      this.storage.set('VerifiedAccounts',VerifiedAccounts)
      this.storage.set('language',language);
      this.storage.set('user_store_verified',user_store_verified);

    })
  
  })
})
    
});
this.popoverController.dismiss();
setTimeout(()=>{    this.router.navigateByUrl('/login')},400);


  }

  async openLogoutAlert() {
    // let logoutConfirm
    // this.translate.get('DOYOUREALLYWANTTOLOGOUTFROMTHEAPPLICATION').subscribe(value => {
    //   logoutConfirm = value;
    // })
    // let yes
    // this.translate.get('YES').subscribe(value => {
    //   yes = value;
    // })

    // let no
    // this.translate.get('NO').subscribe(value => {
    //   no = value;
    // })
    const alert = await this.alertController.create({
      message:  "Do you really want to logout from the application ?",
      buttons: [
        {
          text: 'No',
          handler: () => {
            this.popoverController.dismiss();
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes',
          handler: () => {
           this.logout()
          }
        }
      ]
    });

    await alert.present();
  }


}
