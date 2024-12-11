import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerPageComponent } from './components/customer-page/customer-page.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HostDetailComponent } from './components/host-detail/host-detail.component';
import { NzNotificationModule } from 'ng-zorro-antd';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ReviewComponent } from './components/review/review.component';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ContactComponent } from './components/contact/contact.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MessageRecievedComponent } from './components/message-recieved/message-recieved.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { PaymentComponent } from './components/payment/payment.component';
import { MoneyComponent } from './components/money/money.component';


@NgModule({
  declarations: [CustomerPageComponent, HostDetailComponent, MyBookingsComponent, ReviewComponent, ContactComponent, ProfileComponent, MessageRecievedComponent, UpdateProfileComponent, PaymentComponent, MoneyComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NzSpinModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzLayoutModule,
    NzMessageModule,
    NzSelectModule,
    NzTimePickerModule,
    NzDatePickerModule,
    NzGridModule,
    ReactiveFormsModule,
    FormsModule,
    NzNotificationModule,
    NzTableModule,
    NzRateModule,
    NzCardModule
  ]
})
export class CustomerModule { }
