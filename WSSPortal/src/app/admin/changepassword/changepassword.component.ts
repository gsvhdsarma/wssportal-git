import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Models } from '../../Model/model';
import { NavbarService } from '../../Services/navbar.service';
import { SharedService } from '../../Services/shared-service';
import { AlertService } from '../../Services/alert.service';
import { WSSPortalServiceList } from '../../Services/wssportservicelist.service';

@Component({
    selector: 'usersAddEdit',
    templateUrl: './changepassword.component.html',
    providers: [WSSPortalServiceList],
})

export class ChangepasswordComponent {
    busy: Subscription;
    errorMessage: string;    
    user: Models.User;
    userInfodata: Models.UserLoggedInInfo;

    constructor(private router: Router, private wssService: WSSPortalServiceList,
        private alertService: AlertService, private _sharedService: SharedService, public nav: NavbarService) {

        this.nav.show();
        this.getUserInfoData();
    }

    ngOnInit() {
        this.nav.show();
        this._sharedService.emitChange(this.userInfodata);
        this.user = {
            ID: null,
            USER_ID: '',
            FULL_NAME: '',
            PHONE: null,
            E_MAIL: '',
            USER_TYPE: null,
            PASSWORD: '',
            CREATE_TIME_STAMP: null,
            CREATE_NAME: '',
            MODIFIERS_NAME: '',
            MODIFY_TIME_STAMP: null,
            DELETED: null
        }       
    }

    getUserInfoData() {       
        var obj = localStorage.getItem('currentUser');
        if (obj != null) {
            //this.userInfodata = JSON.parse(this.data);
            var data = JSON.parse(obj.toString());
            this.userInfodata = data[0];
        }
    }

    save(model: any, isValid: boolean) {
        if (isValid == true) {
            this.changePassword(model, this.userInfodata.userID);
        }
        else {
            //this.alertService.error("Enter all the mandatory fields.");
        }
    }

    changePassword(model: Models.User, userID: string) {
        this.busy = this.wssService.changePassword(model, userID)
            .subscribe((_LoggedInInfo: any) => {
                var _UserLoggedInInfo = (_LoggedInInfo);
                this.showMessage(_UserLoggedInInfo);
            }, error => this.errorMessage = <any>error);
    }

    showMessage(message: string) {
        if (message.toString() == "1000") {
            //this.alertService.success("successfully updated the new password.");
            alert("Your password has been updated successfully. You must re-login");
            this.router.navigate(['/login']);
        }
        else if (message.toString() == "1001") {
            this.alertService.error("User does not exists.");
        }
        else if (message.toString() == "1002") {
            this.alertService.error("Incorrect Old password.");
        }
        else if (message.toString() == "1003") {
            this.alertService.error("Old password and New password cannot be same.");
        }
        else {
            this.alertService.error("error occured while processing the request at the server.");
        }
    }
}