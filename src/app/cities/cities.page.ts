import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { CityService } from 'src/app/services/city.service';
import { AuthenticationService } from '../shared/authentication-service';
import { ReservationService } from '../shared/reservation.service';
import 'firebase/compat/firestore';



@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage implements OnInit {
  cities: any = [];
  reservation?: any[];

  constructor(
    private cityService: CityService,
    private loadingCtrl: LoadingController,public authService: AuthenticationService,   private resService: ReservationService,
  ) {}

   
  ngOnInit() {
    this.loadCities();

  }

  async loadCities(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'circles',
    });
    await loading.present();

    this.cityService.getCities().subscribe((res) => {
      loading.dismiss();

      // this will show every time we scroll all the cities we have (solution just to fill the list)
      Object.values(res).forEach((e) => {
          this.cities.push(e);
        }); 
      
      
      console.log(res);


      event?.target.complete();
    });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.loadCities(event);
  }
}
