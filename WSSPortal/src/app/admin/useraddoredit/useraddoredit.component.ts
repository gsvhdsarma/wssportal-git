import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../Services/alert.service';
import { WSSPortalServiceList } from '../../Services/wssportservicelist.service';
import { Subscription } from 'rxjs';
import { Models } from '../../Model/model';

@Component({    
    selector: 'usersAddEdit',
    templateUrl: './useraddoredit.component.html',
    providers: [WSSPortalServiceList],
})

export class UseraddoreditComponent {  
    busy: Subscription;
    errorMessage: string;
    user:any;
     
    constructor(
        private router: Router,
        private wssService: WSSPortalServiceList,
        private alertService: AlertService) { }

    ngOnInit() {
        this.user = {
            username: null,
            email: null,
            password: null,
            confirmPassword: null,
            phone: null,
            isAdmin: false                           
        }
    }


    save(model: Models.User, isValid: boolean) {       
        if (isValid == true) {
            this.saveUserInfo(model);
        }
        else {
            //this.alertService.error("Enter all the mandatory fields.");
        }  
    }

    saveUserInfo(model: any) {
        this.busy = this.wssService.createUser(model)
            .subscribe((_LoggedInInfo: any) => {
                var _UserLoggedInInfo = (_LoggedInInfo);
                this.showMessage(_UserLoggedInInfo);
            }, error => this.errorMessage = <any>error);
    }

    showMessage(message: string) {
        if (message.toString() == "1000") {
            alert("User created sucessfully.");
            //this.alertService.success("User created sucessfully."); 
            this.router.navigate(['/users']);  
        }
        else if (message.toString() == "1001") {
            this.alertService.error("User already exists.");
        }
        else if (message.toString() == "1002") {
            this.alertService.error("Error while creating the user");
        }
        else {
            this.alertService.error("error occured while processing the request at the server.");
        }
    }
}