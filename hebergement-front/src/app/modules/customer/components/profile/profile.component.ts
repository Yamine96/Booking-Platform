import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { CustomerService } from '../../services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;
  loggedUser : String;
  isSpinning = false;
  emailLogger : String;

 

  constructor(private router: Router,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.loggedUser = StorageService.getName();
    this.emailLogger = StorageService.getEmail();
    this.getMyInfos();
  }

  goToLogout() {
    StorageService.logout(); 
    this.router.navigate(['/login']).then(() => {
        window.location.reload(); 
    });
  }


  getMyInfos() {
    this.customerService.getProfileByUserId().subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.profile = res;
    })
  }


}
