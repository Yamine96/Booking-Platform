import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.css']
})
export class MoneyComponent implements OnInit {

  validateForm!: FormGroup;
  isSpinning = false;
  loggedUser : String;

  constructor(private router: Router,
    private fb: FormBuilder,
    private service: CustomerService,
    private activatedroute: ActivatedRoute,
    private message: NzMessageService,
    private customerService : StorageService
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      cash: [null, Validators.required],    
    })
    this.loggedUser = StorageService.getName();
  }

  goToLogout() {
    StorageService.logout(); 
    this.router.navigate(['/login']).then(() => {
        window.location.reload(); 
    });
  }


  addMoney(data: any) {
    console.log(data);
    this.isSpinning = true;
    const moneyDto = {
      cash: data.cash,
      userId: StorageService.getUserId()
    }
    console.log(moneyDto);
    this.service.addMoney(moneyDto).subscribe((res) => {
      console.log(res);
      this.message.success("Money Added successfully", { nzDuration: 5000 });
      this.isSpinning = false;
    }, error => {
      this.message.error("Something went wrong", { nzDuration: 5000 });
      this.isSpinning = false;
    })

  }

}
