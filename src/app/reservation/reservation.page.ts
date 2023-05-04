import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ReservationService } from '../shared/reservation.service';

import 'firebase/compat/firestore';
import { auth } from 'src/environments/environment';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  reservationForm!: FormGroup;
  minDate!: string;
  dateError: boolean = false;
  id: any;
  isSubmitted: boolean = false;
  dateNull: boolean = false;
  reservation: any;
  currentCity: any;
  cityDetails: any;

  constructor(
    private resService: ReservationService,
    private router: Router,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private cityService: CityService
  ) {
    const today = new Date();
    this.minDate = today.toISOString();
    // recupperating cityDetails from the previous reservation page
    this.route.queryParams.subscribe(params => {
      const navExtras = JSON.parse(params['special']);
      this.currentCity = navExtras.cityDetails;
    });
  }

  get email() {
    return this.reservationForm.get('email');
  }
  get name() {
    return this.reservationForm.get('name');
  }
  get phone() {
    return this.reservationForm.get('phone');
  }
  get hotel() {
    return this.reservationForm.get('hotel');
  }
  get duration() {
    return this.reservationForm.get('duration');
  }
  get date() {
    return this.reservationForm.get('date');
  }

  get errorControl() {
    return this.reservationForm.controls;
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*"
          ),
        ],
      ],
      phone: ['', Validators.required],
      hotel: ['', Validators.required],
      date: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
    });
  }

  formSubmit() {
    this.isSubmitted = true;
    if (!this.reservationForm.valid) {
      return false;
    } else {
      /* date validation */
      if (new Date(this.reservationForm.value.date) < new Date()) {
        this.dateError = true;
        return;
      }
      if (new Date(this.reservationForm.value.date) == null) {
        this.dateNull = true;
        return;
      }
      /*    
      var user = auth.currentUser;
      
      console.log("User id",user?.uid);
   */

  
  // create the reservation
  auth.onAuthStateChanged((user) => {
    if (user) {
          this.resService
            .createReservation(this.reservationForm.value, user?.uid,this.currentCity.name)
            .then((res) => {
              console.log('Reservation key', res.key);
              console.log("Current city",this.currentCity);
              console.log("****************************")
              const navExtras = {
                cityDetails: this.currentCity,
                idCity: this.id,
                resKey: res.key,
                
              };

              const navigationExtras: NavigationExtras = {
                queryParams: {
                  special: JSON.stringify(navExtras),
                },
              };

              this.reservationForm.reset();
              this.router.navigate(['/confirmation'], navigationExtras);
            })
            .catch((error) => console.log(error));
        }
      });
      return 0;
    }
  }
}
