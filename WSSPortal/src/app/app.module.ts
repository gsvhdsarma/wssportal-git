import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, JsonpModule, Http } from '@angular/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import {
    PlatformLocation,
    Location,
    LocationStrategy,
    HashLocationStrategy,
    PathLocationStrategy,
    APP_BASE_HREF
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WSSFooterComponent } from './directives/wssfooter/wssfooter.component';
import {NavbarComponent} from './dashboard/navbar/navbar.component';
import {WelcomeComponent} from './dashboard/welcome/welcome.component';
import {LoginComponent} from './login/login.component';

import { AuthenticatedHttpService } from './Services/authenticated-http.service';
import {NavbarService} from './Services/navbar.service';
import {SharedService} from './Services/shared-service';
import {AlertService} from './Services/alert.service';
import {AlertComponent} from './directives/alert/alert.component'
 import { AdminGuard } from './Services/admin-guard.service';
 import { UserGuard } from './Services/user-guard.service';
import { AuthGuard } from './Services/auth.guard';
import { BusyModule } from 'angular2-busy';
import { EqualvalidatorDirective } from './directives/equalvalidator.directive';
import {ChangepasswordComponent} from './admin/changepassword/changepassword.component';
import {UserComponent} from './admin/user/user.component';
import {UseraddoreditComponent} from './admin/useraddoredit/useraddoredit.component';

@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule, GridModule, HttpModule, JsonpModule, AppRoutingModule, 
      DropDownsModule, FormsModule, BusyModule, ChartsModule, InputsModule],
     declarations: [AppComponent,  WelcomeComponent, LoginComponent, NavbarComponent, AlertComponent,
       WSSFooterComponent,
       EqualvalidatorDirective, UserComponent, UseraddoreditComponent, EqualvalidatorDirective, ChangepasswordComponent],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, AuthGuard, AlertService, NavbarService, 
      SharedService,  AdminGuard, UserGuard, { provide: Http, useClass: AuthenticatedHttpService }    
    ],
    entryComponents: [
        //ConfirmComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }