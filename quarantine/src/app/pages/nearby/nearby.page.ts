import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.page.html',
  styleUrls: ['./nearby.page.scss'],
})
export class NearbyPage implements OnInit {
  tabPart = "medical";
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }


  onchat(){

this.navCtrl.navigateForward(["/chat"])

  }
}
