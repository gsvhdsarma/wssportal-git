import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';
import { UseraddoreditComponent } from './useraddoredit/useraddoredit.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [UserComponent, UseraddoreditComponent, ChangepasswordComponent]
})
export class AdminModule { }
