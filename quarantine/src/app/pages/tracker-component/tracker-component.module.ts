import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackerComponentPageRoutingModule } from './tracker-component-routing.module';

import { TrackerComponentPage } from './tracker-component.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackerComponentPageRoutingModule
  ],
  declarations: [TrackerComponentPage]
})
export class TrackerComponentPageModule {}
