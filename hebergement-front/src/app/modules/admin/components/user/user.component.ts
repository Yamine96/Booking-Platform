import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any;


  isSpinning = false;

  constructor(private router:Router,
              private adminService: AdminService,
              private message: NzMessageService) { }

  ngOnInit() {
    this.getAllUsers();
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
    StorageService.logout(); // Clear user data
    this.router.navigate(['/login']).then(() => {
        window.location.reload(); // Refresh the page after navigation
    });
  }

  getAllUsers() {
    this.isSpinning = true;
    this.adminService.getAllUsers().subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.users = res;
    })
  }

  deleteUser(id: number){
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
        const deletedUser = this.users[index];
        this.users.splice(index, 1);
        
        this.adminService.deleteUser(id).subscribe({
            next: () => {
                this.message.success("User deleted successfully", { nzDuration: 5000 });
            },
            error: () => {
                this.users.splice(index, 0, deletedUser);
                this.message.error("Failed to delete user", { nzDuration: 5000 });
            }
        });
  }
 }

}
