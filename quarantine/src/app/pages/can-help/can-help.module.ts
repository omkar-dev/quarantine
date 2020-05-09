import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CanHelpPageRoutingModule } from './can-help-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { CanHelpPage } from './can-help.page';
import { MarkSpamComponent } from 'src/app/components/mark-spam/mark-spam.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    IonicModule,
    CanHelpPageRoutingModule
  ],
  entryComponents: [ MarkSpamComponent ],
  declarations: [CanHelpPage, MarkSpamComponent]
})
export class CanHelpPageModule {}
