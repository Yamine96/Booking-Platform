import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { CustomerService } from '../../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  loggedUser : String;
  bookId: number = this.activatedroute.snapshot.params['id'];
  book: any;
  isSpinning = false;
  dateFormat: "DD-MM-YYYY";

  validateForm!: FormGroup;

  constructor(private service: CustomerService,
    private activatedroute: ActivatedRoute,
    private message: NzMessageService ,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      cardHolder: [null, Validators.required],
      cardNumber: [null, Validators.required],
      expiryDate: [null, Validators.required],
      cvv: [null, Validators.required],
    })
    this.getBookById();
    this.loggedUser = StorageService.getName();
  }

  goToLogout() {
    StorageService.logout(); 
    this.router.navigate(['/login']).then(() => {
        window.location.reload(); 
    });
  }


  getBookById(){
    this.service.getBookById(this.bookId).subscribe((res) =>{
      console.log(res);
      this.book = res;
    });
    }


    addPayment(data: any) {
      console.log(data);
      this.isSpinning = true;
      const paymentDto = {
        cardHolder: data.cardHolder,
        cardNumber: data.cardNumber,
        expiryDate: data.expiryDate,
        cvv: data.cvv,
        userId: StorageService.getUserId(),
        bookId: this.bookId
      }
      console.log(paymentDto);
      this.service.addPayment(paymentDto).subscribe((res) => {
        console.log(res);
        this.router.navigateByUrl("/customer/my_bookings");
        this.message.success("Payment went successfully", { nzDuration: 5000 });
      }, error => {
        this.message.error("Something went wrong", { nzDuration: 5000 });
      })

    }

}
