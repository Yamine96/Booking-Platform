import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  contacts : any;
  isSpinning = false;

  constructor(private router:Router,
              private adminService: AdminService,
              private message: NzMessageService) { }

  ngOnInit() {
    this.getAllContact();
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

  getAllContact() {
    this.isSpinning = true;
    this.adminService.getAllContact().subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.contacts = res;
    })
  }


  deleteReview(id: number){
    const index = this.contacts.findIndex(review => review.id === id);
    if (index !== -1) {
        const deletedContact = this.contacts[index];
        this.contacts.splice(index, 1);
        
        this.adminService.deleteContact(id).subscribe({
            next: () => {
                this.message.success("Contact deleted successfully", { nzDuration: 5000 });
            },
            error: () => {
                this.contacts.splice(index, 0, deletedContact);
                this.message.error("Failed to delete contact", { nzDuration: 5000 });
            }
        });
  }
 }

}
