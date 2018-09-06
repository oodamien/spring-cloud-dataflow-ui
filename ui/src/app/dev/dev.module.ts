import { SharedModule } from 'src/app/shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { AlertModule, ModalModule, BsDropdownModule, PopoverModule, TooltipModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DevRoutingModule } from './dev-routing.module';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DevRoutingModule,
    TooltipModule.forRoot()
  ],
  declarations: [
    DashboardComponent
  ],
  entryComponents: [
  ],
  providers: [
  ],
  exports: [
  ]
})
export class DevModule {
}
