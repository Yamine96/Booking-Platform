import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserComponent } from './components/user/user.component';
import { MessageComponent } from './components/message/message.component';
import { AccomodationComponent } from './components/accomodation/accomodation.component';
import { PostHostComponent } from './components/post-host/post-host.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UpdateHostComponent } from './components/update-host/update-host.component';
import { GetBookingsComponent } from './components/get-bookings/get-bookings.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzCardModule } from 'ng-zorro-antd/card';
import { MessageDetailComponent } from './components/message-detail/message-detail.component';


@NgModule({
  declarations: [AdminDashboardComponent, UserComponent, MessageComponent, AccomodationComponent, PostHostComponent, UpdateHostComponent, GetBookingsComponent, MessageDetailComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
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
    NzTableModule,
    NzRateModule,
    NzCardModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }]
})
export class AdminModule { }
