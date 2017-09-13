import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { BusyModule } from 'angular2-busy';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FormsModule } from '@angular/forms';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './orderdetail/orderdetail.component';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    DropDownsModule,
    GridModule,
    BusyModule,
    InputsModule,
FormsModule
  ],
  declarations: [OrderComponent, OrderDetailComponent]
})
export class OrderModule { }
