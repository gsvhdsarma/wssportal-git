import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { WSSPortalServiceList } from '../Services/wssportservicelist.service';
import { AlertService } from '../Services/alert.service';
import { Models } from '../Model/model';
import { NavbarService } from '../Services/navbar.service';
import * as AppConfig from '../app.config';

@Component({    
    selector: 'login',
    providers: [WSSPortalServiceList],
     templateUrl: './login.component.html',
    // styleUrls: ['../../styles/all.css', '../../styles/bootstrap.min.css', ],    
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    busy: Subscription;
    loggedInUserInfo: Models.UserLoggedInInfo;
    errorMessage: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        //private authenticationService: AuthenticationService,
        private alertService: AlertService,
        public WSSService: WSSPortalServiceList, public nav: NavbarService) { }

    ngOnInit() {
        // reset login status
        // this.authenticationService.logout();
        this.logout();
        this.nav.hide();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.GetUserInfo(this.model.username, this.model.password);

        /*this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });*/
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('acessToken');
    }

    GetUserInfo(username: string, password: string) {
        this.busy = this.WSSService.getUserInfo(username, password)
            .subscribe((_LoggedInInfo: any) => {
                var _UserLoggedInInfo = (_LoggedInInfo);
                this.InsertData(_UserLoggedInInfo);
            }, error => this.errorMessage = <any>error);
    }

    public InsertData(_LIInfo: any) {
        this.loggedInUserInfo = _LIInfo;        
        if (_LIInfo != null) {
            if (_LIInfo.returnCode == "1001") {
                this.alertService.error(AppConfig.UserNotExists.toString());
            }
            else if (_LIInfo.returnCode == "1002") {
                this.alertService.error(AppConfig.UserNotExists.toString());
            }
            else if (_LIInfo.returnCode == "1003") {
                this.alertService.error(AppConfig.WrongPassword.toString());
            }
            else if (_LIInfo.returnCode == "1004") {
                this.alertService.error(AppConfig.UserDisabled.toString());
            }
            else if (_LIInfo.returnCode == 1000) {
                var _data = JSON.parse(_LIInfo.json.toString());
                var atokenInfo = JSON.parse(_LIInfo.atInfo.toString());
                localStorage.setItem('currentUser', JSON.stringify(_data));
                sessionStorage.setItem('acessToken', atokenInfo.access_token);
                //sessionStorage.setItem('refreshToken', atokenInfo.refresh_token);
                if (_data[0].userType == 0) {
                    this.router.navigate(['/users']);
                }
                else {
                    this.router.navigate(['/welcome']);
                }                
            }
        }
        else {
            this.alertService.error(AppConfig.UserNotExists.toString());
            this.loading = false;
        }
    }

    onClickMe(event) {
        this.login();
        //error => this.errorMessage = <any>error);
        event.preventDefault();
    }
}