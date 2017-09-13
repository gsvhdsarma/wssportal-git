import { NgModule,ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import {
    PlatformLocation,
    Location,
    LocationStrategy,
    HashLocationStrategy,
    PathLocationStrategy,
    APP_BASE_HREF
} from '@angular/common';
import { WelcomeComponent } from './dashboard/welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './Services/auth.guard';
import { UserGuard } from './Services/user-guard.service';
import {AdminGuard} from './Services/admin-guard.service';
import {ChangepasswordComponent} from './admin/changepassword/changepassword.component';
import {UserComponent} from './admin/user/user.component';
import {UseraddoreditComponent} from './admin/useraddoredit/useraddoredit.component';

const routes: Routes = [
    { path: '', component: WelcomeComponent, canActivate: [UserGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'welcome', component: WelcomeComponent, canActivate: [UserGuard] },
    { path: 'CylinderDetails', loadChildren: './cylinder/cylinder.module#CylinderModule', canActivate: [UserGuard] },    
    { path: 'order', loadChildren: './order/order.module#OrderModule', canActivate: [UserGuard] },
    { path: 'customer', loadChildren: './customer/customer.module#CustomerModule', canActivate: [UserGuard] },   
    { path: 'users', component: UserComponent, canActivate: [AdminGuard] },
    { path: 'usersAddEdit', component: UseraddoreditComponent, canActivate: [AdminGuard] },
    { path: 'changePassword', component: ChangepasswordComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' },      
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true }),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}