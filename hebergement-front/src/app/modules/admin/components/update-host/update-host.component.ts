import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-update-host',
  templateUrl: './update-host.component.html',
  styleUrls: ['./update-host.component.css']
})
export class UpdateHostComponent implements OnInit {

  isSpinning = false;
  hostId:number=this.activatedRoute.snapshot.params["id"];
  imgChanged: boolean = false;
  selectedFile:any;
  imagePreview:string|ArrayBuffer | null;
  existingImage: string | null = null;
  updateForm!: FormGroup;
  listOfTypes = ["Hotel Golf Resort","La Cigale Hotel","Sentido Bellevue Park", "Marriott Hotel", "Royal Azur Thalassa Hotel", "Chambres privées", "Hotel", "Chambres partagées", "Chambres familiales", "Suites", "Hébergement en groupe", "Cabines ou chalets", "Tentes ou hébergement en plein air"];
  listOfLocations = ["Tunis","Monastir","Hammamet","Sousse","Sfax","Tabarka","Ain Drahem","Gabes","Djerba"];

  constructor(private adminService: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService) { }

  ngOnInit() {
    this.updateForm = this.fb.group({
      type: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      location: [null, Validators.required]
    })
    this.getHostById();
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

  getHostById() {
    this.isSpinning = true;
    this.adminService.getHostById(this.hostId).subscribe((res) => {
      this.isSpinning = false;
      //console.log(res);
      const hostDto = res;
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImage;
      console.log(hostDto);
      console.log(this.existingImage);
      this.updateForm.patchValue(hostDto);
    })
  }

  updateHost() {
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if (this.imgChanged && this.selectedFile){
      formData.append('image', this.selectedFile);
    }
    formData.append('type', this.updateForm.get('type').value);
    formData.append('description', this.updateForm.get('description').value);
    formData.append('location', this.updateForm.get('location').value);
    formData.append('price', this.updateForm.get('price').value);
    console.log(formData);
    this.adminService.updateHost(this.hostId, formData).subscribe((res)=>{
      this.isSpinning = false;
      this.message.success("Host updated successfully", { nzDuration: 5000 });
      this.router.navigateByUrl("/admin/accomodation");
      console.log(res);
    }, (error) => {
      this.isSpinning = false; 
      
      if (error.status === 403) {
          this.message.error("Error please try again", { nzDuration: 5000 });
      } else {
          this.message.error("Error while updating host", { nzDuration: 5000 });
      }
      this.router.navigateByUrl("/admin/host");
      console.error('Error details:', error); 
  });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.imgChanged = true;
    this.existingImage = null;
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () =>  {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

}
