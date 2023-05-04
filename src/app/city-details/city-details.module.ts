import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CityDetailsPageRoutingModule } from './city-details-routing.module';

import { CityDetailsPage } from './city-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CityDetailsPageRoutingModule
  ],
  declarations: [CityDetailsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CityDetailsPageModule {}
