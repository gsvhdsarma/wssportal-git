import { Component, OnInit, ViewChild } from '@angular/core';
import { Models } from '../../Model/model';
import { WSSPortalServiceList } from '../../Services/wssportservicelist.service';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { filterBy, FilterDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { SortDescriptor, orderBy, process, State } from '@progress/kendo-data-query'
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../Services/navbar.service';
import { NavbarComponent } from '../../dashboard/navbar/navbar.component';
import { SharedService } from '../../Services/shared-service';

@Component({
    selector: 'customer',
    providers: [WSSPortalServiceList],
    templateUrl: './customer.component.html'    
})

export class CustomerComponent implements OnInit {
    public pageSize: number = 8;
    public skip: number = 0;
    public gridView: GridDataResult;
    errorMessage: string;
    public filter: CompositeFilterDescriptor;
    public _objCustomers: Models.Customer[];
    public _objInitCustomers: Models.Customer[];
    busy: Subscription;
    private sort: SortDescriptor[] = [];
    data: string;
    userInfodata: Models.UserLoggedInInfo;
    selectedCustomer: Models.Customer;

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

    constructor(public _customerService: WSSPortalServiceList, private router: Router, public nav: NavbarService, private _sharedService: SharedService) {
        this.nav.show();
        this.getUserInfoData();
        this._sharedService.emitChange(this.userInfodata);        
    }
    ngOnInit() { this.getCustomersByuser(); }

    protected pageChange({ skip, take }: PageChangeEvent): void {
        this.skip = skip;
        this.pageSize = take;
        //this.getOrders();
        this.gridView = {
            data: this._objCustomers.slice(this.skip, this.skip + this.pageSize),
            total: this._objCustomers.length
        }
    }

    protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this._objCustomers = orderBy(this._objCustomers, this.sort);
        this.gridView.data = this._objCustomers.slice(this.skip, this.skip + this.pageSize);
        this.gridView.total = this._objCustomers.length;
    }

    getCustomers() {
        this.busy = this._customerService.getCustomers()
            .subscribe((_customers: Models.Customer[]) => {
                this.InsertData(_customers);
                this.gridView = {
                    data: _customers.slice(this.skip, this.skip + this.pageSize),
                    total: _customers.length
                }
            }, error => this.errorMessage = <any>error);
    }

    getCustomersByuser() {
        this.busy = this._customerService.getAllCustomersByuser(this.userInfodata.userID)
            .subscribe((_customers: Models.Customer[]) => {
                this.InsertData(_customers);
                this.gridView = {
                    data: _customers.slice(this.skip, this.skip + this.pageSize),
                    total: _customers.length
                }
            }, error => this.errorMessage = <any>error);
    }

    public InsertData(_customers: Models.Customer[]) {
        this._objCustomers = _customers;
        this._objInitCustomers = _customers;
        this.LoadFilteredData(this._objCustomers);

    }

    public filterChange(filter: CompositeFilterDescriptor): void {
        this.filter = filter;
        var filteredData: any[];
        if (filter.filters.length > 0) {
            if (filter.filters.length == 1) {
                var fd: FilterDescriptor;
                fd = <FilterDescriptor>filter.filters[0];
                if (fd.value == "") {
                    this.LoadFilteredData(this._objInitCustomers);
                    return;
                }
            }
        }
        else {
            this.LoadFilteredData(this._objInitCustomers);
            return;
        }
        this.LoadFilteredData(filterBy(this._objInitCustomers, filter));
    }

    public LoadFilteredData(objModel: Models.Customer[]): void {
        this.gridView =
            {
                data: objModel.slice(this.skip, this.skip + this.pageSize),
                total: objModel.length
            }
        this._objCustomers = objModel;
    }

    onClickOrders(rowData) {
        this.selectedCustomer = rowData;
        this.router.navigate(["order", { 'id': this.selectedCustomer.ID }]);
    };

    onClickCylinders(rowData) {
        this.selectedCustomer = rowData;
        this.router.navigate(["CylinderDetails", { 'id': this.selectedCustomer.ID }]);
    };
}