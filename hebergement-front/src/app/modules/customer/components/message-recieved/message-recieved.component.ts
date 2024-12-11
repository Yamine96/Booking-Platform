import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { StorageService } from 'src/app/auth/services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-message-recieved',
  templateUrl: './message-recieved.component.html',
  styleUrls: ['./message-recieved.component.css']
})
export class MessageRecievedComponent implements OnInit {

  contacts: any;
  isSpinning = false;
  loggedUser : String;

  constructor(private router : Router,
    private service: CustomerService,
    private message: NzMessageService) { }

  ngOnInit() {
    this.getMyContacts();
    this.loggedUser = StorageService.getName();
  }

  goToLogout() {
    StorageService.logout(); 
    this.router.navigate(['/login']).then(() => {
        window.location.reload(); 
    });
  }


  getMyContacts() {
    this.service.getContactByUserId().subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.contacts = res;
    })
  }


  deleteMessages(id: number){
    const index = this.contacts.findIndex(contact => contact.id === id);
    if (index !== -1) {
        const deletedReview = this.contacts[index];
        this.contacts.splice(index, 1);
        
        this.service.deleteMessages(id).subscribe({
            next: () => {
                this.message.success("Message deleted successfully", { nzDuration: 5000 });
            },
            error: () => {
                this.contacts.splice(index, 0, deletedReview);
                this.message.error("Failed to delete message", { nzDuration: 5000 });
            }
        });
  }
 }

}
