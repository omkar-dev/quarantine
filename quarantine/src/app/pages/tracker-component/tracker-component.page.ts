import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tracker-component',
  templateUrl: './tracker-component.page.html',
  styleUrls: ['./tracker-component.page.scss'],
})
export class TrackerComponentPage implements OnInit {

  constructor(private modalController : ModalController) { }

  ngOnInit() {
  }

  closeModal()
  {
    this.modalController.dismiss()
  }

}
