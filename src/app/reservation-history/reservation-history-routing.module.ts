import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationHistoryPage } from './reservation-history.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationHistoryPageRoutingModule {}
