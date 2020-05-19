import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FeedbackComponent } from '../feedback/feedback.component';
import { AppRatingService } from 'src/app/services/app-rating/app-rating.service';

@Component({
  selector: 'app-home-popover',
  templateUrl: './home-popover.component.html',
  styleUrls: ['./home-popover.component.scss'],
})
export class HomePopoverComponent implements OnInit {
  persistentObj: {};

  constructor(private modalController : ModalController,
    private popoverController: PopoverController, private router: Router, private storage: Storage, 
    private appRating: AppRatingService
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
      this.storage.clear();
      this.storage.set('OnboardingShown',OnboardingShown);
      this.storage.set('VerifiedAccounts',VerifiedAccounts)
      this.storage.set('language',language);
  
  })
})
    
});
this.popoverController.dismiss();
setTimeout(()=>{    this.router.navigateByUrl('/login')},400);


  }


}
