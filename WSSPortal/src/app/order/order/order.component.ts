import { Component, OnInit, ViewChild } from '@angular/core';
import { Models } from '../../Model/model';
import { WSSPortalServiceList } from '../../Services/wssportservicelist.service';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { filterBy, FilterDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { SortDescriptor, orderBy, process, State } from '@progress/kendo-data-query'
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { URLSearchParams, QueryEncoder } from '@angular/http';
import { Http, Response } from '@angular/http';
//import '../Scripts/aspData.js';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../Services/navbar.service';
import { SharedService } from '../../Services/shared-service';

@Component({
    selector: 'order',
    providers: [WSSPortalServiceList],
    templateUrl: './order.component.html',    
})

export class OrderComponent implements OnInit {
    public pageSize: number = 8;
    public skip: number = 0;
    public gridView: GridDataResult;
    errorMessage: string;
    public filter: CompositeFilterDescriptor;
    public _objOrders: Models.Order[];
    public _objInitOrders: Models.Order[];

    selectedVessel: Models.Vessels;
    selectedMonth: Models.PortalMonth;
    selectedYear: Models.PortalYears;
    selectedCustomer: Models.Customer;
    public vesselsList: Models.Vessels[];
    public Months: Models.PortalMonth[];
    public Years: Models.PortalYears[];
    objOrderSearch: Models.OrderSearch = new Models.OrderSearch();
    public customerList: Models.Customer[];
    private sort: SortDescriptor[] = [];
    data: string;
    userInfodata: Models.UserLoggedInInfo;
    public selectedId: number = 0;
    public customerByID: Models.Customer;
    busy: Subscription;
    public orderNO: string;
    public mask: string = "Order Number";

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

    constructor(public _orderService: WSSPortalServiceList, private http: Http, private route: ActivatedRoute,
        private router: Router, public nav: NavbarService, private _sharedService: SharedService) {
        this.nav.show();
        this.getUserInfoData();
    }

    ngOnInit() {// this.getOrdersByUserID('124'); 
        this.nav.show();
        this._sharedService.emitChange(this.userInfodata);
        this.GetAllVessels();
        this.objOrderSearch.History = "NO";
        this.route.params.subscribe(params => {
            this.selectedId = +params['id'];
        });
        if (this.selectedId.toString().toLowerCase() == "nan") {
            this.selectedId = 0;
            this.fetchData();
        }
    }

    protected pageChange({ skip, take }: PageChangeEvent): void {
        this.skip = skip;
        this.pageSize = take;
        //this.getOrders();
        this.gridView = {
            data: this._objOrders.slice(this.skip, this.skip + this.pageSize),
            total: this._objOrders.length
        }
    }

    protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this._objOrders = orderBy(this._objOrders, this.sort);
        this.gridView.data = this._objOrders.slice(this.skip, this.skip + this.pageSize);
        this.gridView.total = this._objOrders.length;
    }

    getOrders() {
        this._orderService.getOrders()
            .subscribe((_orders: Models.Order[]) => {
                this.InsertData(_orders);
                this.gridView = {
                    data: _orders.slice(this.skip, this.skip + this.pageSize),
                    total: _orders.length
                }
            }, error => error => console.log(error.text()));
        //error => this.errorMessage = <any>error);
    }

    getVesselsByUsrCust() {
        var custID = "";
        if (this.selectedCustomer != null) {
            custID = this.selectedCustomer.CUSTOMER_ID;
        }

        this._orderService.GetVesselsByUsrCust(this.userInfodata.userID, custID, 'O')
            .subscribe((_vessels: Models.Vessels[]) => {
                var _vessels1: Models.Vessels[]
                _vessels1 = JSON.parse(_vessels.toString());
                this.InsertVesslsData(_vessels1);
            }, error => this.errorMessage = <any>error);
    }

    GetAllVessels() {
        var d = new Date();
        var year = d.getFullYear();
        //this._orderService.GetAllVessels()                   
        //    .subscribe((_vessels: Models.Vessels[]) => {
        //        var _vessels1: Models.Vessels[]
        //        _vessels1 = JSON.parse(_vessels.toString());
        //        this.InsertVesslsData(_vessels1);
        //    }, error => this.errorMessage = <any>error);

        var _yearslist: Models.PortalYears[] = [];
        for (var _i = year; _i >= 2000; _i--) {
            var objPortalYears: Models.PortalYears = new Models.PortalYears();
            objPortalYears.Year = (_i).toString();
            objPortalYears.YearNo = (_i).toString();
            _yearslist.push(objPortalYears);

        }
        this.Years = _yearslist;
        var _monthslist: Models.PortalMonth[] = [];

        for (var month in Models.Months) {
            var objPortalMonths: Models.PortalMonth = new Models.PortalMonth();
            objPortalMonths.Month = Models.Months[month].MonthName;
            objPortalMonths.MonthNo = Models.Months[month].MonthNo.toString();
            _monthslist.push(objPortalMonths);
        }
        this.Months = _monthslist;
        this.busy = this._orderService.getAllCustomersByuser(this.userInfodata.userID)
            .subscribe((_customer: Models.Customer[]) => {
                this.InsertCustomerData(_customer);
            }, error => this.errorMessage = <any>error);
    }

    getOrdersByUserID(userID: string) {
        this._orderService.getOrdersByUser(userID)
            .subscribe((_orders: Models.Order[]) => {
                this.InsertData(_orders);
                this.gridView = {
                    data: _orders.slice(this.skip, this.skip + this.pageSize),
                    total: _orders.length
                }
            }, error => error => console.log(error.text()));
        //error => this.errorMessage = <any>error);
    }

    public InsertData(_orders: Models.Order[]) {
        this._objOrders = _orders;
        this._objInitOrders = this._objOrders;
        this.LoadFilteredData(this._objOrders);
    }

    public InsertVesslsData(_vessels: Models.Vessels[]) {
        this.vesselsList = _vessels;
    }

    public InsertCustomerData(_customer: Models.Customer[]) {
        this.customerList = _customer;
        if (this.selectedId != 0) {
            this.objOrderSearch.CustomerID = this.selectedId.toString();
            this.customerByID = this.customerList.filter(
                cust => cust.ID === this.selectedId)[0];
            this.selectedCustomer = this.customerByID;
            this.fetchData();
        }
        this.getVesselsByUsrCust();
    }
    public filterChange(filter: CompositeFilterDescriptor): void {
        this.filter = filter;
        var filteredData: any[];
        if (filter.filters.length > 0) {
            if (filter.filters.length == 1) {
                var fd: FilterDescriptor;
                fd = <FilterDescriptor>filter.filters[0];
                if (fd.value == "") {
                    this.LoadFilteredData(this._objInitOrders);
                    return;
                }
            }
        }
        else {
            this.LoadFilteredData(this._objInitOrders);
            return;
        }
        this.LoadFilteredData(filterBy(this._objInitOrders, filter));
    }

    public LoadFilteredData(objModel: Models.Order[]): void {
        if (objModel != null) {
            this.gridView =
                {
                    data: objModel.slice(this.skip, this.skip + this.pageSize),
                    total: objModel.length
                }
            this._objOrders = objModel;
        }
    }
    handleVesselChange(value) {
        this.selectedVessel = value;
    }
    handleMonthChange(value) {
        this.selectedMonth = value;

    }
    handleYearChange(value) {
        this.selectedYear = value;
    }
    handleCustomerChange(value) {
        this.selectedCustomer = value;
        this.selectedVessel = null;
        this.getVesselsByUsrCust();
    }
    onClickMe(event) {
        this.skip = 0;
        this.fetchData();
        //error => this.errorMessage = <any>error);
        event.preventDefault();
    }

    onChange(data) {
        if (data.target.checked) {
            this.objOrderSearch.History = "YES";
        } else {
            this.objOrderSearch.History = "NO";
        }
    }

    fetchData() {
        if (this.selectedVessel != undefined) {
            this.objOrderSearch.VesselID = this.selectedVessel.VESSEL_ID;
        }
        else {
            this.objOrderSearch.VesselID = '';
        }

        if (this.selectedMonth != undefined) {
            this.objOrderSearch.MonthNo = this.selectedMonth.MonthNo;
        }
        else {
            this.objOrderSearch.MonthNo = '';
        }

        if (this.selectedYear != undefined) {
            this.objOrderSearch.YearNo = this.selectedYear.YearNo;
        }
        else {
            this.objOrderSearch.YearNo = '';
        }

        if (this.selectedCustomer != undefined) {
            this.objOrderSearch.CustomerID = this.selectedCustomer.ID.toString();
        }
        else {
            this.objOrderSearch.CustomerID = '';
        }

        if (this.orderNO != undefined) {
            if (this.orderNO.length >= 0) {
                this.objOrderSearch.OrderNo = this.orderNO;
            }
            else {
                this.objOrderSearch.OrderNo = '';
            }
        }
        else {
            this.objOrderSearch.OrderNo = '';
        }

        this.objOrderSearch.UserID = this.userInfodata.userID;
        this.busy = this._orderService.getOrdersByUserSearch(this.objOrderSearch)
            .subscribe((_orders: Models.Order[]) => {
                var _Initorders: Models.Order[];
                _Initorders = JSON.parse(_orders.toString());
                this.InsertData(_Initorders);
                this.gridView = {
                    data: _Initorders.slice(this.skip, this.skip + this.pageSize),
                    total: _Initorders.length
                }
            }, error => error => console.log(error.text()));
    }
}
