import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  

  private baseUrl = 'http://localhost:1337/api';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<any> {
    return this.http.get(this.baseUrl+'/blogs?populate=*');
  }
}
