import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanHelpPage } from './can-help.page';

const routes: Routes = [
  {
    path: '',
    component: CanHelpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanHelpPageRoutingModule {}
