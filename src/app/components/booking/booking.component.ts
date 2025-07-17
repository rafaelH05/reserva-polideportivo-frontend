import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../service/booking.service';
import { Booking } from '../../booking';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NgSelectModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {

  selectedFacility: number = 0;
  today: string = new Date().toISOString().split('T')[0];
  selectedDate: any;
  selectedTime: any;
  times: string[] = [];

  constructor(private bookingService: BookingService) { }

  onChanges(horaElegida?: any) {
    this.times = [];
    this.selectedTime = horaElegida;
    if (this.selectedFacility != undefined && this.selectedDate != undefined) {

      this.bookingService.getTimesFacilityDate(this.selectedFacility, this.selectedDate).subscribe(
        data => {
          this.times = data;
        },
        error => {
          console.error("Error fetching available times:", error);
        }
      );
    }
  }

  booking() {
    if (this.selectedDate && this.selectedTime && this.selectedFacility) {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded: any = jwtDecode(token);
        const userId = decoded.userId;


        this.bookingService.createBooking(new Booking(userId, this.selectedFacility, `${this.selectedDate}T${this.selectedTime}:00`, `${this.selectedDate}T${this.sumarHoraYMedia(this.selectedTime)}:00`, new Date().toISOString())).subscribe(
          response => {
            localStorage.setItem('bookingSuccess', 'Reserva realizada correctamente');
            window.location.href = "/homeLogin";
          },
          error => {
            console.error("Error creating booking:", error);
          }
        );
      }

    }
  }

  sumarHoraYMedia(time: string): string {
    const [h, m] = time.split(':').map(Number);
    const date = new Date(0, 0, 0, h, m);
    date.setMinutes(date.getMinutes() + 90); // Suma 1h 30min (90 minutos)
    const horas = date.getHours().toString().padStart(2, '0');
    const minutos = date.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
  }

  ngOnInit(): void{
      if(localStorage.getItem("selectedHour")){
        let facilityNumber = localStorage.getItem("selectedFacility");
      let horaElegida = localStorage.getItem("selectedHour");
      
      this.selectedFacility = facilityNumber !== null ? Number(facilityNumber) : 0;
      this.selectedDate = this.today;

      this.onChanges(horaElegida);
      }
  }
}

