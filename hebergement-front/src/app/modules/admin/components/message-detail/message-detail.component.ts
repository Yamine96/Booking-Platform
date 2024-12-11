import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css']
})
export class MessageDetailComponent implements OnInit {

  contactId: number = this.activatedroute.snapshot.params['id'];
  contact: any;
  isSpinning = false;

  validateForm!: FormGroup;

  constructor(private service: AdminService,
              private activatedroute: ActivatedRoute,
              private router:Router,
              private message: NzMessageService,
              private fb: FormBuilder) {}

  ngOnInit(){
    this.validateForm = this.fb.group({
      response: [null, Validators.required]
    })

    this.getContactById();
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

  getContactById(){
    this.service.getContactById(this.contactId).subscribe((res) =>{
      console.log(res);
      this.contact = res;
    });
    }


    AddResponse(data: any) {
      console.log(data);
      this.isSpinning = true;
      const responseContactDto = {
        response: data.response,
        contactId: this.contactId,
        userId: this.contact.userId
      }
      console.log(responseContactDto);
      this.service.AddResponse(responseContactDto).subscribe((res) => {
        console.log(res);
        this.message.success("send message went successfully", { nzDuration: 5000 });
      }, error => {
        this.message.error("Something went wrong", { nzDuration: 5000 });
      })

    }

}
