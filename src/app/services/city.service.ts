import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICity } from '../city';
environment
@Injectable({
  providedIn: 'root'
})
export class CityService {
  private _url:string= "/assets/data/cities.json";

  constructor(private http: HttpClient) { }

getCities():Observable<ICity[]> {
  return this.http.get<ICity[]>(`${this._url}`);}

getCityDetails(id: string) {
  return this.http.get<any>(`/assets/data/cities.json`)
    .pipe(
      map((data: any[]) => data.filter(city=> city.id==id)[0])
    );
}

}
