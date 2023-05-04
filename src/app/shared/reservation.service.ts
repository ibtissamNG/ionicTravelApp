import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/compat/database';
import { Reservation } from './reservation';
import { auth } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservationListRef!: AngularFireList<any>;
  reservationRef!: AngularFireObject<any>;

  
  constructor(private db: AngularFireDatabase) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.reservationListRef = this.db.list('/reservation/'+ user.uid);
      }});
  }

  // Create reservation
  createReservation(res: Reservation,idUser: any,cityName: any) {
    return this.reservationListRef.push({
      idUser: idUser,
      cityName: cityName,
      name: res.name,
      email: res.email,
      phone: res.phone,
      hotel: res.hotel,
      date: res.date,
      duration: res.duration
    });
  }

  // Get Single
  getReservation(idRes: string,idUser: string) {
    this.reservationRef = this.db.object('/reservation/'+idUser+'/'+idRes);
    return this.reservationRef;
  }

  // Get List
  getReservationList(idUser: any) {
   this.reservationListRef = this.db.list('/reservation/'+idUser);
    return this.reservationListRef;
  }

  // Update
  updateReservation(id: string, res: Reservation) {
    return this.reservationRef.update({
      name: res.name,
      email: res.email,
      phone: res.phone,
      hotel: res.hotel,
      duration: res.duration
    });
  }
  
  // Delete
  deleteReservation(idRes: string,idUser: string) {
    this.reservationRef = this.db.object('/reservation/'+idUser+'/'+idRes);
    return this.reservationRef.remove();
  }
}
