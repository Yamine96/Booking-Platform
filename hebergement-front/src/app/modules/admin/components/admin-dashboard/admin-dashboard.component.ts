import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  reviews: any;


  isSpinning = false;

  constructor(private router:Router,
              private adminService: AdminService,
              private message: NzMessageService) { }

  ngOnInit() {
    const hasReloaded = sessionStorage.getItem('hasReloaded');

    if (!hasReloaded || hasReloaded === 'false') {
      // Perform actions that need to happen only once
      sessionStorage.setItem('hasReloaded', 'true');
      window.location.reload(); // Reload the page once
    } else {
      sessionStorage.setItem('hasReloaded', 'false');
    }
    this.getAllReview();
  }

  goToUser(){
    this.router.navigate(['/admin/user']);
  }
  goToMessage(){
    this.router.navigate(['/admin/message']);
  }
  goToAccomodation(){
    this.router.navigate(['/admin/accomodation']);
  }
  goToDashboard(){
    this.router.navigate(['/admin/dashboard']);
  }
  goToAddHost(){
    this.router.navigate(['/admin/host']);
  }
  goToBookings() {
    this.router.navigate(['/admin/bookings']);
  }
  goToLogout() {
    StorageService.logout(); 
    this.router.navigate(['/login']).then(() => {
        window.location.reload(); 
    });
  }

  getAllReview() {
    this.isSpinning = true;
    this.adminService.getAllReview().subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.reviews = res;
    })
  }

  deleteReview(id: number){
    const index = this.reviews.findIndex(review => review.id === id);
    if (index !== -1) {
        const deletedReview = this.reviews[index];
        this.reviews.splice(index, 1);
        
        this.adminService.deleteReview(id).subscribe({
            next: () => {
                this.message.success("Review deleted successfully", { nzDuration: 5000 });
            },
            error: () => {
                this.reviews.splice(index, 0, deletedReview);
                this.message.error("Failed to delete review", { nzDuration: 5000 });
            }
        });
  }
 }
}




