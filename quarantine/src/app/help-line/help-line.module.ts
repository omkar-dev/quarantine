import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpLinePageRoutingModule } from './help-line-routing.module';

import { HelpLinePage } from './help-line.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpLinePageRoutingModule
  ],
  declarations: [HelpLinePage]
})
export class HelpLinePageModule {}
