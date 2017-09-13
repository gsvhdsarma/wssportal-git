import { Component, OnInit, ViewChild } from '@angular/core';
import { Models } from '../../Model/model';
import { WSSPortalServiceList } from '../../Services/wssportservicelist.service';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { filterBy, FilterDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { SortDescriptor, orderBy, process, State } from '@progress/kendo-data-query'
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { URLSearchParams, QueryEncoder } from '@angular/http';
import { Http, Response } from '@angular/http';

import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../Services/navbar.service';
import { SharedService } from '../../Services/shared-service';
import { AlertService } from '../../Services/alert.service';

@Component({
    selector: 'users',
    providers: [WSSPortalServiceList],
    templateUrl: './user.component.html',
})

export class UserComponent implements OnInit {
    public pageSize: number = 8;
    public skip: number = 0;
    public gridView: GridDataResult;
    errorMessage: string;
    public filter: CompositeFilterDescriptor;
    public _objUsers: Models.User[];    
    public _objInitUsers: Models.User[];
    private sort: SortDescriptor[] = [];
    data: string;
    userInfodata: Models.UserLoggedInInfo;
    busy: Subscription;
        
    getUserInfoData() {
        //this.data = aspData.getData();
        //this.userInfodata = JSON.parse(this.data);
        var obj = localStorage.getItem('currentUser');
        if (obj != null) {
            //this.userInfodata = JSON.parse(this.data);
            var data = JSON.parse(obj.toString());
            this.userInfodata = data[0];
        }
    }

    constructor(public _WSSService: WSSPortalServiceList, private http: Http, private route: ActivatedRoute,
        private router: Router, public nav: NavbarService, private _sharedService: SharedService, private alertService: AlertService) {
        this.nav.show();
        this.getUserInfoData();
    }

    ngOnInit() {
        this.nav.show();
        this._sharedService.emitChange(this.userInfodata);
        this.getUsers();
    }

    protected pageChange({ skip, take }: PageChangeEvent): void {
        this.skip = skip;
        this.pageSize = take;
        //this.getOrders();
        this.gridView = {
            data: this._objUsers.slice(this.skip, this.skip + this.pageSize),
            total: this._objUsers.length
        }
    }

    protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this._objUsers = orderBy(this._objUsers, this.sort);
        this.gridView.data = this._objUsers.slice(this.skip, this.skip + this.pageSize);
        this.gridView.total = this._objUsers.length;
    }

    getUsers() {
        this._WSSService.getUsers()
            .subscribe((_users: Models.User[]) => {
                this.InsertData(_users);                
            }, error => error => console.log(error.text()));
        //error => this.errorMessage = <any>error);
    }   

    public InsertData(_users: Models.User[]) {
        this._objUsers = _users.filter(
            user => user.ID.toString() != this.userInfodata.userID)
        //this._objUsers = _users;
        this._objInitUsers = this._objUsers;
        this.LoadFilteredData(this._objUsers);
        this.gridView = {
            data: this._objUsers.slice(this.skip, this.skip + this.pageSize),
            total: this._objUsers.length
        }
    }
      
    public filterChange(filter: CompositeFilterDescriptor): void {
        this.filter = filter;
        var filteredData: any[];
        if (filter.filters.length > 0) {
            if (filter.filters.length == 1) {
                var fd: FilterDescriptor;
                fd = <FilterDescriptor>filter.filters[0];
                if (fd.value == "") {
                    this.LoadFilteredData(this._objInitUsers);
                    return;
                }
            }
        }
        else {
            this.LoadFilteredData(this._objInitUsers);
            return;
        }
        this.LoadFilteredData(filterBy(this._objInitUsers, filter));
    }

    public LoadFilteredData(objModel: Models.User[]): void {
        if (objModel != null) {
            this.gridView =
                {
                    data: objModel.slice(this.skip, this.skip + this.pageSize),
                    total: objModel.length
                }
            this._objUsers = objModel;
        }
    }
   
    onClickEdit(event) {  
       
    }

    onClickAddUser() {
        this.router.navigate(['/usersAddEdit']);
    }

    onClickDisable(event) {
        if (confirm("Are you sure you want to disable this user: " + event.EMAIL)) {
            this.disableAUser(event.ID);
            //event.preventDefault();
        }
    }

    disableAUser(userID: string) {
        this.busy = this._WSSService.disableAUser(userID)
            .subscribe((_returnStatus: any) => {
                var _UserLoggedInInfo = (_returnStatus);     
                this.showdisableUserMSG(_returnStatus);           
            }, error => this.errorMessage = <any>error);
    }

    public showdisableUserMSG(message: string) {
        if (message.toString() == "1000") {
            this.getUsers();
            this.alertService.success("User successfully disabled.");
        }
        else if (message.toString() == "1001") {
            this.alertService.error("User does not exists.");
        }
        else if (message.toString() == "1002") {
            this.alertService.error("Failed to disable the user.");
        }
        else {
            this.alertService.error("error occured while processing the request at the server.");
        }
    }   

    onClickResetPassword(event) {
        if (confirm("Are you sure you want to reset the password for this user: " + event.EMAIL)) {
            this.resetPassword4AUser(event.ID);
        }        
    }

    resetPassword4AUser(userID: string) {
        this.busy = this._WSSService.resetPassword4AUsr(userID)
            .subscribe((_returnStatus: any) => {
                var _UserLoggedInInfo = (_returnStatus);
                this.showResetPasswordMSG(_returnStatus);
            }, error => this.errorMessage = <any>error);
    }

    public showResetPasswordMSG(message: string) {
        if (message.toString() == "1000") {
            this.getUsers();
            this.alertService.success("User password has been reset.");
        }
        else if (message.toString() == "1001") {
            this.alertService.success("User does not exists.");
        }
        else if (message.toString() == "1002") {
            this.alertService.success("Failed to reset user password.");
        }       
        else {
            this.alertService.success("error occured while processing the request at the server.");
        }
    }

    onClickEnable(event) {
        if (confirm("Are you sure you want to enable this user: " + event.EMAIL)) {
            this.enableAUser(event.ID);
        }
    }

    enableAUser(userID: string) {
        this.busy = this._WSSService.enableAUser(userID)
            .subscribe((_returnStatus: any) => {
                var _UserLoggedInInfo = (_returnStatus);
                this.showEnableUserMSG(_returnStatus);
            }, error => this.errorMessage = <any>error);
    }

    public showEnableUserMSG(message: string) {
        if (message.toString() == "1000") {
            this.getUsers();
            this.alertService.success("User successfully enabled.");
        }
        else if (message.toString() == "1001") {
            this.alertService.error("User does not exists.");
        }
        else if (message.toString() == "1002") {
            this.alertService.error("Failed to enable the user.");
        }
        else {
            this.alertService.error("error occured while processing the request at the server.");
        }
    }
}
