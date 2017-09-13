import { Injectable } from '@angular/core';
import { Models } from '../Model/model';

@Injectable()
export class NavbarService {
    visible: boolean;
    userFname: string;
    userInfodata: Models.UserLoggedInInfo;
    constructor() { this.visible = false; }

    hide() { this.visible = false; }

    show() {
        this.visible = true;
        //this.getUserInfoData();
        //this.userFname = this.userInfodata.userFName;
    }

    toggle() { this.visible = !this.visible; }

    setUName(name: string) { }

    //getUserInfoData() {
    //    //this.data = aspData.getData();
    //    var obj = localStorage.getItem('currentUser');
    //    if (obj != null) {
    //        //this.userInfodata = JSON.parse(this.data);
    //        var data = JSON.parse(obj.toString());
    //        this.userInfodata = data[0];
    //    }
    //}

}
