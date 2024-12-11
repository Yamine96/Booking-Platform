import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { CustomerService } from '../../services/customer.service';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  bookId:number = this.activatedroute.snapshot.params['id'];
  validateForm!: FormGroup;
  loggedUser : String;

  constructor(private fb:FormBuilder,
              private message: NzMessageService,
              private router: Router,
              private customerService: CustomerService,
              private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      rating: [null, Validators.required],
      review: [null, Validators.required]
    })
    this.loggedUser = StorageService.getName();
  }

  goToLogout() {
    StorageService.logout(); 
    this.router.navigate(['/login']).then(() => {
        window.location.reload(); 
    });
  }

  giveReview(){
    const reviewDto = {
      rating: this.validateForm.get("rating").value,
      review: this.validateForm.get("review").value,
      userId: StorageService.getUserId(),
      bookId: this.bookId
    }

    this.customerService.giveReview(reviewDto).subscribe((res) =>{
      this.message.success("Review posted successfuly", { nzDuration: 5000 });
      this.router.navigateByUrl("/customer/my_bookings");
    }, error => {
      this.message.error("Something went wrong", { nzDuration: 5000 });
    })
  }

}
