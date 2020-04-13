import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../../pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'visit-history',
        loadChildren: () => import('../../pages/visit-history/visit-history.module').then( m => m.VisitHistoryPageModule)
      },
      {
        path: 'nearby',
        loadChildren: () => import('../../pages/nearby/nearby.module').then( m => m.NearbyPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
