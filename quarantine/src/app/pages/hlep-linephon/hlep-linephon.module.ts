import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HlepLinephonPageRoutingModule } from './hlep-linephon-routing.module';

import { HlepLinephonPage } from './hlep-linephon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HlepLinephonPageRoutingModule
  ],
  declarations: [HlepLinephonPage]
})
export class HlepLinephonPageModule {}
