import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerPageComponent } from './components/customer-page/customer-page.component';
import { HostDetailComponent } from './components/host-detail/host-detail.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { ReviewComponent } from './components/review/review.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MessageRecievedComponent } from './components/message-recieved/message-recieved.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { PaymentComponent } from './components/payment/payment.component';
import { MoneyComponent } from './components/money/money.component';


const routes: Routes = [
  { path: "dashboard", component: CustomerPageComponent},
  { path: "book/:id", component: HostDetailComponent},
  { path: "my_bookings", component: MyBookingsComponent},
  { path: "review/:id", component: ReviewComponent},
  { path: "contact", component: ContactComponent },
  { path: "profile", component: ProfileComponent },
  { path: "messages", component: MessageRecievedComponent },
  { path: "profile/:id", component: UpdateProfileComponent },
  { path: "payment/:id", component: PaymentComponent },
  { path: "money", component: MoneyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
