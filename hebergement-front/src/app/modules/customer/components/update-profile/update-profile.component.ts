import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  isSpinning = false;
  profile: any;
  updateForm!: FormGroup;
  id:number=this.activatedRoute.snapshot.params["id"];
  loggedUser : String;
  emailLogger : String;

  constructor(private customerService:CustomerService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private message: NzMessageService,
              private router: Router) { }

  ngOnInit() {
    this.updateForm = this.fb.group({
      ville: [null, Validators.required],
      tel: [null, Validators.required]
    })
    this.getMyInfos();
    this.loggedUser = StorageService.getName();
    this.emailLogger = StorageService.getEmail();
  }

  goToLogout() {
    StorageService.logout(); 
    this.router.navigate(['/login']).then(() => {
        window.location.reload(); 
    });
  }


  getMyInfos() {
    this.customerService.getByUserId(this.id).subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      const userDto = res;
      this.updateForm.patchValue(userDto);
    })
  }

  updateProfile() {
    this.isSpinning = true;
    const formData: FormData = new FormData();
    formData.append('ville', this.updateForm.get('ville').value);
    formData.append('tel', this.updateForm.get('tel').value);
    console.log(formData);
    this.customerService.updateUser(this.id,formData).subscribe((res)=>{
      this.isSpinning = false;
      this.message.success("Profile updated successfully", { nzDuration: 5000 });
      this.router.navigateByUrl("/customer/profile");
      console.log(res);
    }, (error) => {
      this.isSpinning = false; 
      
      if (error.status === 403) {
          this.message.error("Error please try again", { nzDuration: 5000 });
      } else {
          this.message.error("Error while updating profile", { nzDuration: 5000 });
      }
      console.error('Error details:', error); 
  });
  }

}
