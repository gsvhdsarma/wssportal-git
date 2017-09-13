import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { BusyModule } from 'angular2-busy';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FormsModule } from '@angular/forms';

import { CylinderRoutingModule } from './cylinder-routing.module';
import { CylinderComponent } from './cylinder/cylinder.component';
import { CylinderDetailComponent } from './cylinderdetail/cylinderdetail.component';

@NgModule({
  imports: [
    CommonModule,
    CylinderRoutingModule,
    DropDownsModule,
    GridModule,
    BusyModule,
    InputsModule,
    FormsModule
  ],
  declarations: [CylinderComponent, CylinderDetailComponent]
})
export class CylinderModule { }
