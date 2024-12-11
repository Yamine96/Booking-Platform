import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserComponent } from './components/user/user.component';
import { MessageComponent } from './components/message/message.component';
import { AccomodationComponent } from './components/accomodation/accomodation.component';
import { PostHostComponent } from './components/post-host/post-host.component';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { UpdateHostComponent } from './components/update-host/update-host.component';
import { GetBookingsComponent } from './components/get-bookings/get-bookings.component';
import { MessageDetailComponent } from './components/message-detail/message-detail.component';


const routes: Routes = [
  { path: "dashboard", component: AdminDashboardComponent},
  { path: "user" , component: UserComponent},
  { path: "message" , component: MessageComponent},
  { path: "accomodation" , component: AccomodationComponent},
  { path: "host" , component: PostHostComponent},
  { path: "login" , component: LoginComponent},
  { path: "host/:id" , component: UpdateHostComponent },
  { path: "bookings" , component: GetBookingsComponent},
  { path: "messages/:id" , component: MessageDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
