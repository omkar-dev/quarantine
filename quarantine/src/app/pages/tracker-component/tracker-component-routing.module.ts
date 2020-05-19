import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackerComponentPage } from './tracker-component.page';

const routes: Routes = [
  {
    path: '',
    component: TrackerComponentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackerComponentPageRoutingModule {}
