import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {

  feedbackMessage: string = "";

  constructor(private popoverController: PopoverController, private toastController: ToastController) { }

  ngOnInit() {}

  confirmFeedback() {
    if (!this.feedbackMessage) { return 0; }
    this.popoverController.dismiss().then(() => {
      this.presentToast();
    });
  }

  async presentToast() {
    let toast = await this.toastController.create({
      message: 'Feedback Submitted',
      duration: 2000,
      position: 'bottom'
    });
  
    return await (await toast).present();
  }

  closeFeedback() {
    this.popoverController.dismiss();
  }

}
