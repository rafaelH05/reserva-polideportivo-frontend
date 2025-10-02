import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    try {
      if(token != null){
          const decode: any = jwtDecode(token);
          const now = Date.now() /1000;
          if(decode.exp < now){
            this.router.navigate(['/login']);
            localStorage.removeItem('token');
            return false;
          }
          return true;
      }
      else{
        this.router.navigate(['/login']);   
        return false;
      }
    } catch (error) {
      this.router.navigate(['/login']);
      localStorage.removeItem('token');
      return false;
    }

  }
}
