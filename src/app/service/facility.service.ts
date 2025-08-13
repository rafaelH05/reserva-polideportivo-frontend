import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  private api: string = 'https://reserva-polideportivo-backend.onrender.com';

  constructor(private http:HttpClient) { }

  getFacilityList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/facilities`);
  }
  getFacilityById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/facility/${id}`);
  }
}
