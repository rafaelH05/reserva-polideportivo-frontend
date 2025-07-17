import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private api: string = 'http://localhost:8080';

  constructor(private http:HttpClient) { }

  getBookingList(): Observable<any[]> {
    const headers = new HttpHeaders({ "Authorization": `Bearer ${localStorage.getItem("token")}` });
    return this.http.get<any[]>(`${this.api}/bookings`, { headers });
  }

  getBookingFree(): Observable<any[]> {
    const headers = new HttpHeaders({ "Authorization": `Bearer ${localStorage.getItem("token")}` });
    return this.http.get<any[]>(`${this.api}/booking-today`, { headers });
  }

  getBookingFacility(id: number): Observable<any[]> {
    const headers = new HttpHeaders({ "Authorization": `Bearer ${localStorage.getItem("token")}` });
    return this.http.get<any[]>(`${this.api}/bookings-with-facility/${id}`, { headers });
  }

  getBookingByUserId(id: number): Observable<any> {
    const headers = new HttpHeaders({ "Authorization": `Bearer ${localStorage.getItem("token")}` });
    return this.http.get<any[]>(`${this.api}/bookings/${id}`, { headers });
  }

  createBooking(booking: any): Observable<any> {
    const headers = new HttpHeaders({ "Authorization": `Bearer ${localStorage.getItem("token")}` });
    return this.http.post<any>(`${this.api}/booking/create`, booking, { headers });
  }

  updateBooking(id: number, booking: any): Observable<any> {
    const headers = new HttpHeaders({ "Authorization": `Bearer ${localStorage.getItem("token")}` });
    return this.http.put<any>(`${this.api}/booking/update${id}`, booking, { headers });
  }

  deleteBooking(id: number): Observable<any> {
    const headers = new HttpHeaders({ "Authorization": `Bearer ${localStorage.getItem("token")}` });
    return this.http.delete(`${this.api}/booking/delete/${id}`, { headers });
  }
  getTimesFacilityDate(facilityId: number, date: string): Observable<any[]> {
    const headers = new HttpHeaders({ "Authorization": `Bearer ${localStorage.getItem("token")}` });
    return this.http.get<any[]>(`${this.api}/booking-available-hours/${facilityId}/${date}`, { headers });
  }
}
