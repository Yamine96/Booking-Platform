import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

  bookings: any;
  isSpinning = false;
  loggedUser : String;

  constructor(private router : Router,
              private service: CustomerService) { }

  ngOnInit()  {
    this.getMyBookings();
    this.loggedUser = StorageService.getName();
  }

  goToLogout() {
    StorageService.logout(); 
    this.router.navigate(['/login']).then(() => {
        window.location.reload(); 
    });
  }

  getMyBookings() {
    this.service.getBookingsByUserId().subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.bookings = res;
    })
  }

}
