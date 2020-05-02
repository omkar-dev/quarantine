import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NeedHelpPageRoutingModule } from './need-help-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { NeedHelpPage } from './need-help.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    NeedHelpPageRoutingModule
  ],
  declarations: [NeedHelpPage]
})
export class NeedHelpPageModule {}
