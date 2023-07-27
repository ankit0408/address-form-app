import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'YOUR_BACKEND_API_URL'; // Replace this with your actual backend API URL

  constructor(private http: HttpClient) { }

  validatePhoneNumber(phoneNumber: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/validatePhoneNumber`, { phoneNumber });
  }
}
