import { Component, OnInit } from '@angular/core';
import { PopoverController ,NavParams} from '@ionic/angular';

@Component({
  selector: 'app-mark-spam',
  templateUrl: './mark-spam.component.html',
  styleUrls: ['./mark-spam.component.scss'],
})
export class MarkSpamComponent implements OnInit {
  spam=[];
  constructor(private popoverController: PopoverController,
    public navParams: NavParams
    ) { }

  ngOnInit() {

 console.log(this.navParams.get('data'));

  }

  onMarkSpam() {
    this.spam=[]
    this.popoverController.dismiss();
  }

}
