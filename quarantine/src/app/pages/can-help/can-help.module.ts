import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CanHelpPageRoutingModule } from './can-help-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { CanHelpPage } from './can-help.page';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    CanHelpPageRoutingModule
  ],
  declarations: [CanHelpPage]
})
export class CanHelpPageModule {}
