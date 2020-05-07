import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NeedHelpPageRoutingModule } from './need-help-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { NeedHelpPage } from './need-help.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NeedHelpPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule

  ],
  declarations: [NeedHelpPage]
})
export class NeedHelpPageModule {}
