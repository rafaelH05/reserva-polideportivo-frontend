import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { Login } from '../Login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api : string = '/api';

  constructor(private http:HttpClient) { }

  getUserList():Observable<User []>{
    const headers = new HttpHeaders({"Authorization": `Bearer ${localStorage.getItem("token")}`});
    return this.http.get<User[]>(`${this.api}/users`, { headers });
  }

  getUserId():Observable<User>{
     const headers = new HttpHeaders({"Authorization": `Bearer ${localStorage.getItem("token")}`});
    return this.http.get<User>(`${this.api}/user/2`, { headers });
  }

  deleteUser(id? : number):Observable<any>{
     const headers = new HttpHeaders({"Authorization": `Bearer ${localStorage.getItem("token")}`});
    return this.http.delete(`${this.api}/${id}`, { headers });
  }

  createUser(user : User):Observable<any>{
    return this.http.post<User>(`${this.api}/create`, user);
  }

  loginUser(login : Login):Observable<any>{
    return this.http.post<any>(`${this.api}/login`, login);
  }

}
