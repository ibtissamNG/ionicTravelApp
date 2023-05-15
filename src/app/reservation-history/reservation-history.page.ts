import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../shared/reservation.service';
import 'firebase/compat/firestore';
import { auth } from 'src/environments/environment';
import { LoadingController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { AuthenticationService } from '../shared/authentication-service';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-reservation-history',
  templateUrl: './reservation-history.page.html',
  styleUrls: ['./reservation-history.page.scss'],
})
export class ReservationHistoryPage implements OnInit {
  reservation!: any[];
  userMail!: any;
  currentUser: any;

  constructor(
    private resService: ReservationService,
    private loadingCtrl: LoadingController,
    public authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadReservations();
  }

  async loadReservations(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'circles',
    });
    await loading.present();

    // use onAuthStateChanged so if the page is refreshed the user value is not null
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user.uid;
        console.log('user', this.currentUser);
        this.userMail = user.email;
        this.resService
          .getReservationList(user?.uid)
          .snapshotChanges()
          .pipe(
            map((snapshots) =>
              snapshots.map((snapshot) => ({
                key: snapshot.key,
                ...snapshot.payload.val(),
              }))
            )
          )
          .subscribe((res) => {
            loading.dismiss();
            this.reservation = res;
            console.log(this.reservation);
            event?.target.complete();
          });
      } else {
        console.log('user in unknown');
      }
    });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.loadReservations(event);
  }

  delete(res: any, idUser: string) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer votre réservation ?');
    if (confirmation) {
    console.log('item deleted', res);
    console.log('item.key', res.key);

    this.resService
      .deleteReservation(res.key, idUser)
      .then(() => {
        this.reservation = this.reservation.filter((item) => item.key !== res.key); 
      })
      .catch((error) => {
        console.log('error deleting item', error);
      });
  }
}
}
