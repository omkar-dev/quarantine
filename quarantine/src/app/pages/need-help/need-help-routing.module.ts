import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NeedHelpPage } from './need-help.page';

const routes: Routes = [
  {
    path: '',
    component: NeedHelpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NeedHelpPageRoutingModule {}
