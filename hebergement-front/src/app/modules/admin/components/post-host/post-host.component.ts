import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-post-host',
  templateUrl: './post-host.component.html',
  styleUrls: ['./post-host.component.css']
})
export class PostHostComponent implements OnInit {

  postHostForm!: FormGroup;
  isSpinning: boolean = false;
  selectedImageFile: File | null = null;
  selectedVideoFile: File | null = null;
  imagePreview: string | ArrayBuffer | null;
  listOfTypes = ["Hotel Golf Resort","La Cigale Hotel","Sentido Bellevue Park", "Marriott Hotel", "Royal Azur Thalassa Hotel", "Chambres privées", "Hotel", "Chambres partagées", "Chambres familiales", "Suites", "Hébergement en groupe", "Cabines ou chalets", "Tentes ou hébergement en plein air"];
  listOfLocations = ["Tunis","Monastir","Hammamet","Sousse","Sfax","Tabarka","Ain Drahem","Gabes","Djerba"];

  constructor(private router: Router, 
              private fb: FormBuilder, 
              private adminService: AdminService,
              private message: NzMessageService) { }

  ngOnInit(): void {
    this.postHostForm = this.fb.group({
      type: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      location: [null, Validators.required]
    });
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


  postHost() {
    console.log(this.postHostForm.value);
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }
    if (this.selectedVideoFile) {
      formData.append('video', this.selectedVideoFile); 
    }
    formData.append('type', this.postHostForm.get('type').value);
    formData.append('description', this.postHostForm.get('description').value);
    formData.append('location', this.postHostForm.get('location').value);
    formData.append('price', this.postHostForm.get('price').value);

    console.log(formData);
    this.adminService.postHost(formData).subscribe((res) => {
      this.isSpinning = false;
      this.message.success("Host posted successfully", { nzDuration: 5000 });
      this.router.navigateByUrl("/admin/accomodation");
      console.log(res);
    }, (error) => {
      this.isSpinning = false; 
      if (error.status === 403) {
        this.message.error("Error please try again", { nzDuration: 5000 });
      } else {
        this.message.error("Error while posting host", { nzDuration: 5000 });
      }
      this.router.navigateByUrl("/admin/host");
      console.error('Error details:', error); 
    });
  }

  onImageFileSelected(event: any) {
    this.selectedImageFile = event.target.files[0];
    this.previewImage();
  }

  onVideoFileSelected(event: any) {
    this.selectedVideoFile = event.target.files[0]; 
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedImageFile);
  }
}
