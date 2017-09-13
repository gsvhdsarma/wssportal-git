import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../Services/navbar.service';
import { Models } from '../../Model/model';
import { SharedService } from '../../Services/shared-service';

@Component({
    selector: 'wss-navbar',
    templateUrl: './navbar.component.html',
    styleUrls:['../../../assets/Style/wssnavbar.css'],
})

export class NavbarComponent implements OnInit {
    userFname: string;
    userInfodata: Models.UserLoggedInInfo;
    isAdmin: string;

    constructor(public nav: NavbarService, private _sharedService: SharedService) {
        _sharedService.changeEmitted$.subscribe(
            UInfo => {
                //this.userFname = text;
                this.setLoggedInUserInfo(UInfo);
            });
    }

    ngOnInit() {
    }

    setLoggedInUserInfo(UInfo: Models.UserLoggedInInfo) {
        this.userInfodata = UInfo;
        this.userFname = UInfo.userFName.toString();
        this.isAdmin = UInfo.userType;
    }

}