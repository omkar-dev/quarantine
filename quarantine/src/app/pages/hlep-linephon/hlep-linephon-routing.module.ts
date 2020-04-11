import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HlepLinephonPage } from './hlep-linephon.page';

const routes: Routes = [
  {
    path: '',
    component: HlepLinephonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HlepLinephonPageRoutingModule {}
