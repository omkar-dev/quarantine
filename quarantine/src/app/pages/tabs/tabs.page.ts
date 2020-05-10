import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { HomePopoverComponent } from 'src/app/components/home-popover/home-popover.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  username: string = 'Username';

  constructor(private popoverController: PopoverController,private storage:Storage) { }

  ngOnInit() {
    this.storage.get('UserStore').then(user=>{
      this.username=user.name
    })
    if(this.username.length>24){
     this.username= this.username.slice(0,21)+'...'
    }
  }

  async openMenu(event) {
    const popover = this.popoverController.create({
      component: HomePopoverComponent,
      event: event
    });
    return (await popover).present();
  }

}
