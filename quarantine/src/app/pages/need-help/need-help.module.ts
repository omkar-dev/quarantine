import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NeedHelpPageRoutingModule } from './need-help-routing.module';

import { NeedHelpPage } from './need-help.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NeedHelpPageRoutingModule,
    TranslateModule,
  ],
  declarations: [NeedHelpPage]
})
export class NeedHelpPageModule {}
