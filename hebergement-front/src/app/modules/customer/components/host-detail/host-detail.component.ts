import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { error } from 'console';
import { formatDate } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-host-detail',
  templateUrl: './host-detail.component.html',
  styleUrls: ['./host-detail.component.css']
})
export class HostDetailComponent implements OnInit {

  hostId: number = this.activatedroute.snapshot.params['id'];
  host: any;
  processedImage: any;
  isSpinning = false;
  dateFormat: "DD-MM-YYYY";
  review: any;
  loggedUser : String;
  videoUrl: string | ArrayBuffer | null;
  

  validateForm!: FormGroup;

  constructor(private service: CustomerService,
    private activatedroute: ActivatedRoute,
    private message: NzMessageService ,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      toDate: [null, Validators.required],
      fromDate: [null, Validators.required],
    })
    this.getHostById();
    this.getReviewByHostId();
    this.loggedUser = StorageService.getName();
  }

  goToLogout() {
    StorageService.logout(); 
    this.router.navigate(['/login']).then(() => {
        window.location.reload(); 
    });
  }

  getHostById(){
    this.service.getHostById(this.hostId).subscribe((res) =>{
      console.log(res);
      this.processedImage = 'data:image/jpeg;base64,' + res.returnedImage;
      this.host = res;
      if (res.returnedVideo) {
        this.videoUrl = 'data:video/mp4;base64,' + res.returnedVideo; 
    }
    });
    }

    bookAHost(data: any) {
      console.log(data);
      this.isSpinning = true;
    
      // Format the dates to match the backend's expected format (if necessary)
      const fromDate = formatDate(data.fromDate, 'yyyy-MM-dd', 'en-US'); // Adjust format as required
      const toDate = formatDate(data.toDate, 'yyyy-MM-dd', 'en-US'); // Adjust format as required
    
      const bookAHostDto = {
        fromDate: fromDate,
        toDate: toDate,
        userId: StorageService.getUserId(),
        hostId: this.hostId
      };
    
      console.log(bookAHostDto);
      this.service.bookAHost(bookAHostDto).subscribe(
        (res) => {
          console.log(res);
          this.router.navigateByUrl("/customer/dashboard");
          this.message.success("Booking went successfully", { nzDuration: 5000 });
        },
        (error) => {
          if (error.status === 400 && error.error === 'Booking failed: dates are already booked') {
            this.message.error('error', { nzDuration: 5000 });
          } else {
            this.message.error("Cannot book now: dates are already booked", { nzDuration: 5000 });
          }
          console.error(error);
        }
      );
    }

    getReviewByHostId(){
      this.service.getReviewByHostId(this.hostId).subscribe((res) =>{
        console.log(res);
        this.review = res;
        
      });
      }
  

}
