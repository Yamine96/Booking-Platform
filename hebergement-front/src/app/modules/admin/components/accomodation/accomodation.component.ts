import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { AdminService } from '../../services/admin.service';
import { element } from 'protractor';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-accomodation',
  templateUrl: './accomodation.component.html',
  styleUrls: ['./accomodation.component.css']
})
export class AccomodationComponent implements OnInit {

  hosts: any = [];

  constructor(private router:Router, private adminService: AdminService,
              private message: NzMessageService) { }

  ngOnInit() {
    this.getAllHosts();
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

  getAllHosts() {
    this.adminService.getAllHosts().subscribe((res) => {
      console.log(res);
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.hosts.push(element);
      });
    })
  }

  deleteHost(id: number){
    const index = this.hosts.findIndex(host => host.id === id);
    if (index !== -1) {
        const deletedHost = this.hosts[index];
        this.hosts.splice(index, 1);
        
        this.adminService.deleteHost(id).subscribe({
            next: () => {
                this.message.success("Host deleted successfully", { nzDuration: 5000 });
            },
            error: () => {
                this.hosts.splice(index, 0, deletedHost);
                this.message.error("Failed to delete host", { nzDuration: 5000 });
            }
        });
  }
 }
}
