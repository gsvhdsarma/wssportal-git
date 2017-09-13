import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { BusyModule } from 'angular2-busy';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer/customer.component';

@NgModule({
  imports: [
    CommonModule,
    CustomerRoutingModule,
    DropDownsModule,
    GridModule,
    BusyModule
  ],
  declarations: [CustomerComponent]
})
export class CustomerModule { }
