import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer-page.component.html',
  styleUrls: ['./customer-page.component.css']
})
export class CustomerPageComponent implements OnInit {
  users: any = [];
  hosts: any = [];
  validateForm!:FormGroup;
  loggedUser : String;
 


  constructor(private service: CustomerService,
    private fb: FormBuilder,
    private router: Router) { }



  ngOnInit() {
    const hasReloaded = sessionStorage.getItem('hasReloaded');

    if (!hasReloaded || hasReloaded === 'false') {
      sessionStorage.setItem('hasReloaded', 'true');
      window.location.reload(); 
    } else {
      sessionStorage.setItem('hasReloaded', 'false');
    }

    this.validateForm = this.fb.group({
      service: [null, [Validators.required]]
    })

    this.getAllHosts();
    this.loggedUser = StorageService.getName();
  }

  goToLogout() {
    StorageService.logout(); 
    this.router.navigate(['/login']).then(() => {
        window.location.reload(); 
    });
  }
  

  getAllHosts() {
    this.service.getAllHosts().subscribe((res) => {
      console.log(res);
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.hosts.push(element);
      });
    })
  }


  searchHostByType(){
    this.service.searchHostByType(this.validateForm.get(['service']).value).subscribe((res) => {
      console.log(res);
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.hosts = res;
      });
    })
  }

}
