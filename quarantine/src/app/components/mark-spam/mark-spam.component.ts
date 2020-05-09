import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-mark-spam',
  templateUrl: './mark-spam.component.html',
  styleUrls: ['./mark-spam.component.scss'],
})
export class MarkSpamComponent implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  onMarkSpam() {
    this.popoverController.dismiss();
  }

}
