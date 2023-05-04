import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';


import { CityService } from 'src/app/services/city.service';

import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.page.html',
  styleUrls: ['./city-details.page.scss'],
})
export class CityDetailsPage implements OnInit {

  city!: any;
  constructor(private route: ActivatedRoute, private cityService: CityService,  private router: Router,) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.cityService.getCityDetails(id!).subscribe((res)=>{
      this.city = res;
    });
 
  }

  visit(){
    const navExtras = {
      cityDetails: this.city,
    };

    const navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(navExtras),
      },
    };
    this.router.navigate(['/reservation'], navigationExtras);
  }

}
