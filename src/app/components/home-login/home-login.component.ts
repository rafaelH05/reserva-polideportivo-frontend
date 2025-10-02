import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { UserService } from '../../service/user.service';
import { jwtDecode } from "jwt-decode";
import { BookingService } from '../../service/booking.service';
import { CommonModule } from '@angular/common';
import { FacilityService } from '../../service/facility.service';
import { MessageService } from '../../service/message.service';
import { MessageComponent } from "../../message/message.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-home-login',
  standalone: true,
  imports: [HeaderComponent, CommonModule, MessageComponent, FooterComponent],
  templateUrl: './home-login.component.html',
  styleUrl: './home-login.component.css'
})
export class HomeLoginComponent {


  userName: string = "";
  userId: number = 0;
  bookings: any[] = [];
  facilityFree: { [facilityId: number]: string[] } = {};
  bookingId: number | null = null;

  constructor(
    private bookingService: BookingService,
    public messageService: MessageService
  ) { }

  ngOnInit(): void {

    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      this.userName = decoded.sub;
      this.userId = decoded.userId;
    }


    this.bookingService.getBookingFacility(this.userId).subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          this.bookings = data;
        }
        
      },
      error => {
        console.error("Error fetching booking data:", error);
      }
    );

    this.bookingService.getBookingFree().subscribe(
      data => {
        this.groupByFacility(data);
      }
      , error => {
        console.error("Error fetching free booking data:", error);
      }
    );

    // Mostrar mensaje si existe
    const bookingSuccess = localStorage.getItem('bookingSuccess');
    if (bookingSuccess) {
      this.messageService.showSuccess(bookingSuccess);
      localStorage.removeItem('bookingSuccess');
    }
  }

  groupByFacility(data: any[]) {
    this.facilityFree = {};
    for (let i = 0; i < data.length; i++) {
      const facilityId = data[i][0];
      const hora = data[i][1].slice(0,5);

      if (this.facilityFree.hasOwnProperty(facilityId)) {
        this.facilityFree[facilityId].push(hora);
      }
      else {
        this.facilityFree[facilityId] = [hora];
      }
    }
    
  }


  getFacilityImage(facilityId: number): string {
    switch (facilityId) {
      case 1: return 'assets/Padel.png';
      case 2: return 'assets/Padel.png';
      case 3: return 'assets/Tenis.png';
      case 4: return 'assets/Tenis.png';
      case 5: return "assets/Futbol.png";
      default: return "";
    }
  }

  getHourButton(hora: string, facility: number): void {
   localStorage.setItem('selectedHour', hora);
   localStorage.setItem('selectedFacility', facility.toString());
  }
  reservarPista(){
    localStorage.removeItem('selectedHour');
    localStorage.removeItem('selectedFacility');
  }

  borrarReserva(n: number): void{
    this.bookingId = n;
  }

  confirmarBorrarReserva(): void {
    if (this.bookingId !== null) {
      this.bookingService.deleteBooking(this.bookingId).subscribe(
        response => {
          window.location.reload();
        },
        error => {
          console.error("Error deleting booking:", error);
          this.messageService.showError(error.status, error.error);
        }
      );
      this.bookingId = null; 
    }
  }
}
