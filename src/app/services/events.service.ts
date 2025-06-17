import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private apiUrl = 'http://localhost:1337/api/events?populate=*';

  constructor(private http: HttpClient) { }

  // Single method to handle all event data fetching
  getEvents(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}