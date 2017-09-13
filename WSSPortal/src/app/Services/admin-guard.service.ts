import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Models } from '../Model/model';

@Injectable()
export class AdminGuard implements CanActivate {
    userInfodata: Models.UserLoggedInInfo;

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var obj = localStorage.getItem('currentUser');
        if (obj) {
            // logged in so return true
            
            if (obj != null) {
                //this.userInfodata = JSON.parse(this.data);
                var data = JSON.parse(obj.toString());
                this.userInfodata = data[0];
                if (this.userInfodata.userType == "0") {
                    return true;
                }
            }
            //return false;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }   
}