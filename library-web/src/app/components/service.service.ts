import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseUrl: string = 'http://localhost:3000/api/books'; // Assurez-vous que cette URL est correcte

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}