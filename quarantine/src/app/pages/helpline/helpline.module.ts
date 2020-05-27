import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HelplinePageRoutingModule } from './helpline-routing.module';

import { HelplinePage } from './helpline.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    HelplinePageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [HelplinePage]
})
export class HelplinePageModule {}

