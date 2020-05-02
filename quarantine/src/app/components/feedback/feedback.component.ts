import { Component, OnInit } from '@angular/core';
import { PopoverController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {

  feedbackMessage: string = "";

  constructor(private popoverController: PopoverController, private toastController: ToastController, private http : HttpClient) { }

  ngOnInit() {}

  confirmFeedback() {
   
    if (!this.feedbackMessage) { return 0; }
    this.popoverController.dismiss().then(() => {
      this.presentToast();
    });

    let body = {
      "email" : "samuel9.edu@gmail.com",
      "message" : this.feedbackMessage
    }

    return this.http.post("https://us-central1-quarantine-275006.cloudfunctions.net/Feedback",(body), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    .subscribe(res=>{
      if(res)
      {
        console.log(res);
      }
      
    })

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
