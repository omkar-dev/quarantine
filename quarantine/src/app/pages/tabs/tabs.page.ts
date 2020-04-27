import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { HomePopoverComponent } from 'src/app/components/home-popover/home-popover.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  username: string = 'Username';

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }

  async openMenu(event) {
    const popover = this.popoverController.create({
      component: HomePopoverComponent,
      event: event
    });
    return (await popover).present();
  }

}
