import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitHistoryPage } from './visit-history.page';

const routes: Routes = [
  {
    path: '',
    component: VisitHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitHistoryPageRoutingModule {}
