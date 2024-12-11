import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { CustomerService } from '../../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

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
    subject: [null, Validators.required],
    message: [null, Validators.required],
  })
  this.loggedUser = StorageService.getName();
  }

  goToLogout() {
    StorageService.logout(); 
    this.router.navigate(['/login']).then(() => {
        window.location.reload(); 
    });
  }

  contactAdmin(data: any) {
    console.log(data);
    this.isSpinning = true;
    const contactDto = {
      subject: data.subject,
      message: data.message,
      userId: StorageService.getUserId()
    }
    console.log(contactDto);
    this.service.contactAdmin(contactDto).subscribe((res) => {
      console.log(res);
      this.message.success("Message sended successfully", { nzDuration: 5000 });
      this.isSpinning = false;
    }, error => {
      this.message.error("Something went wrong", { nzDuration: 5000 });
      this.isSpinning = false;
    })

  }

}
