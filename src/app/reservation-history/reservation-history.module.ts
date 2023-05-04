import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservationHistoryPageRoutingModule } from './reservation-history-routing.module';

import { ReservationHistoryPage } from './reservation-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservationHistoryPageRoutingModule
  ],
  declarations: [ReservationHistoryPage]
})
export class ReservationHistoryPageModule {}
