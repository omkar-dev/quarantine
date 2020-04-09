import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpLinePage } from './help-line.page';

const routes: Routes = [
  {
    path: '',
    component: HelpLinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpLinePageRoutingModule {}
