import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // apiUrl: any;

  constructor(private http: HttpClient) { }

  getData(phoneNumber: string): Observable<any> {
    const url = `http://localhost:5000/api/phone_numbers/${phoneNumber}/addresses`; // Replace 'your-endpoint' with the actual endpoint on your API
    return this.http.get<any>(url).pipe(
      catchError((error: any) => {
        console.error('Error fetching data from the API:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }


  saveEntitiesData(address: string): Observable<any> {

    console.log(address)
    
    const url = 'http://localhost:5000/api/store_address_entities';
    return this.http.post<any>(url, address).pipe(
      catchError((error: any) => {
        console.error('Error sending data to the API:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  saveData(address: string): Observable<any> {

    console.log(address)
    
    const url = 'http://localhost:5000/api/store_address';
    return this.http.post<any>(url, address).pipe(
      catchError((error: any) => {
        console.error('Error sending data to the API:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }

  getEntity(completeAddress: string, entities: string): Observable<any> {

    const url = `http://localhost:5000/api/addresses/entities?complete_address=${encodeURIComponent(completeAddress)}&entities_field=${entities}`;

    return this.http.get<any>(url).pipe(
      catchError((error: any) => {
        console.error('Error fetching data from the API:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
  }
}