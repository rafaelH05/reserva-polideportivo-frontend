import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login copy/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeLoginComponent } from './components/home-login/home-login.component';
import { AuthGuard } from './auth.guard';
import { BookingComponent } from './components/booking/booking.component';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'homeLogin', component: HomeLoginComponent, canActivate: [AuthGuard]},
    {path: 'booking', component: BookingComponent, canActivate: [AuthGuard]}
];

