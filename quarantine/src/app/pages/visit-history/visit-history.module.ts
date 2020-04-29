import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitHistoryPageRoutingModule } from './visit-history-routing.module';

import { VisitHistoryPage } from './visit-history.page';
import { SafePipeModule } from 'safe-pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SafePipeModule,
    VisitHistoryPageRoutingModule
  ],
  declarations: [VisitHistoryPage]
})
export class VisitHistoryPageModule {}
