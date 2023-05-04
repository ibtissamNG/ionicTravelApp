import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CityService } from '../services/city.service';
import { Reservation } from '../shared/reservation';
import { ReservationService } from '../shared/reservation.service';
import 'firebase/compat/firestore';
import { auth } from 'src/environments/environment';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {

  reservation: any;
  dateTime!: string;
  idCity!: string;
  resKey!: string;
  cityDetails: any;
 

  constructor(
    private resService: ReservationService,
    private route: ActivatedRoute,
    private cityService: CityService
  ) {
    this.route.queryParams.subscribe(params => {
      const navExtras = JSON.parse(params['special']);
      this.resKey = navExtras.resKey;
      this.cityDetails = navExtras.cityDetails;

      auth.onAuthStateChanged((user) => {
        if (user) {
          this.resService.getReservation(this.resKey,auth.currentUser!.uid).valueChanges().subscribe(res => {
            this.reservation = res;
            console.log("****************************")
            console.log("Reservation",this.reservation)
            console.log("City ",this.cityDetails)
            console.log("Res id",this.resKey)
        });
      }});
     
  });
  }

  ngOnInit() {
    setTimeout(() => {
      this.dateTime = new Date().toISOString();
    });
  }
}
