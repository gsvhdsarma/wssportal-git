import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Models } from '../../Model/model';
import { WSSPortalServiceList } from '../../Services/wssportservicelist.service';
import { GridDataResult, PageChangeEvent, DataStateChangeEvent, GridModule } from '@progress/kendo-angular-grid';
//import { ConfirmComponent } from './utils/ModalDialog';
//import { DialogService } from "ng2-bootstrap-modal";
import { SortDescriptor, orderBy, process, State } from '@progress/kendo-data-query'
import { filterBy, FilterDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
//import "../Style/kendo.custom.less";
//import '../Scripts/aspData.js';
declare var aspData: any;
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../Services/navbar.service';
import { SharedService } from '../../Services/shared-service';

@Component({

    selector: 'Cylinder',
    providers: [WSSPortalServiceList],
    templateUrl: './cylinder.component.html'
})

export class CylinderComponent implements OnInit {

    public pageSize: number = 8;
    public skip: number = 0;

    errorMessage: string;
    private sort: SortDescriptor[] = [];
    cylinderData = [];
    public _objcylinders: Models.Cylinder[];
    public _objInitCylinders: Models.Cylinder[];

    public filter: CompositeFilterDescriptor;
    public gridView: GridDataResult;
    //public _objCylinders: any[];

    selectedVessel: Models.Vessels;
    selectedMonth: Models.PortalMonth;
    selectedYear: Models.PortalYears;
    selectedCustomer: Models.Customer;
    public vesselsList: Models.Vessels[];
    public Months: Models.PortalMonth[];
    public Years: Models.PortalYears[];
    objOrderSearch: Models.OrderSearch = new Models.OrderSearch();
    public customerList: Models.Customer[];
    data: string;
    userInfodata: Models.UserLoggedInInfo;
    public customerByID: Models.Customer;
    public selectedId: number = 0;
    busy: Subscription;
    public orderNO: string;

    getUserInfoData() {
        //var aspData: any;
        //this.data = aspData.getData();  //drawGauge() is a function inside d3gauge.js
        //this.userInfodata = JSON.parse(this.data);
        var obj = localStorage.getItem('currentUser');
        if (obj != null) {
            //this.userInfodata = JSON.parse(this.data);
            var data = JSON.parse(obj.toString());
            this.userInfodata = data[0];
        }
    }

    //constructor(public _cylinderService: WSSPortalServiceList, private dialogService: DialogService) {
    constructor(public _cylinderService: WSSPortalServiceList, private route: ActivatedRoute,
        private router: Router, private _sharedService: SharedService, public nav: NavbarService) {
        //   this.gridView.data = this.gridView.data.slice(this.skip, this.skip + this.pageSize)  
        this.nav.show();
        this.getUserInfoData();
    }

    ngOnInit() { //this.getCylinders(); 
        this.nav.show();
        this._sharedService.emitChange(this.userInfodata);
        this.GetAllVessels();
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
        // this.getCylinders();       
        this.gridView = {
            data: this._objcylinders.slice(this.skip, this.skip + this.pageSize),
            total: this._objcylinders.length
        }
    }

    protected sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this._objcylinders = orderBy(this._objcylinders, this.sort);
        this.gridView.data = this._objcylinders.slice(this.skip, this.skip + this.pageSize);
        this.gridView.total = this._objcylinders.length;
    }

    getCylinders() {
        this._cylinderService.getCylinders()
            .subscribe((_cylinders: Models.Cylinder[]) => {
                _cylinders = orderBy(_cylinders, this.sort)
                this.InsertData(_cylinders);
            }, error => this.errorMessage = <any>error);
    }

    public InsertData(_cylinders: Models.Cylinder[]) {
        this._objcylinders = _cylinders;
        this._objInitCylinders = _cylinders;
        this.LoadFilteredData(this._objcylinders);
    }

    //showConfirm() {
    //    let disposable = this.dialogService.addDialog(ConfirmComponent, {
    //        title: 'Confirm title',
    //        message: 'Confirm message'
    //    })
    //        .subscribe((isConfirmed) => {
    //            //We get dialog result
    //            if (isConfirmed) {
    //                alert('accepted');
    //            }
    //            else {
    //                alert('declined');
    //            }
    //        });
    //    //We can close dialog calling disposable.unsubscribe();
    //    //If dialog was not closed manually close it by timeout
    //    setTimeout(() => {
    //        disposable.unsubscribe();
    //    }, 10000);
    //}

    public filterChange(filter: CompositeFilterDescriptor): void {
        this.filter = filter;
        var filteredData: any[];
        if (filter.filters.length > 0) {
            if (filter.filters.length == 1) {
                var fd: FilterDescriptor;
                fd = <FilterDescriptor>filter.filters[0];
                if (fd.value == "") {
                    this.LoadFilteredData(this._objInitCylinders);
                    return;
                }
            }
        }
        else {
            this.LoadFilteredData(this._objInitCylinders);
            return;
        }
        this.LoadFilteredData(filterBy(this._objInitCylinders, filter));
    }

    public LoadFilteredData(objModel: Models.Cylinder[]): void {
        this.gridView =
            {
                data: objModel.slice(this.skip, this.skip + this.pageSize),
                total: objModel.length
            }
        this._objcylinders = objModel;
    }

    getVesselsByUsrCust() {
        var custID = "";
        if (this.selectedCustomer != null) {
            custID = this.selectedCustomer.CUSTOMER_ID;
        }

       this._cylinderService.GetVesselsByUsrCust(this.userInfodata.userID, custID,'C')
            .subscribe((_vessels: Models.Vessels[]) => {
                var _vessels1: Models.Vessels[]
                _vessels1 = JSON.parse(_vessels.toString());
                this.InsertVesslsData(_vessels1);
            }, error => this.errorMessage = <any>error);
    }

    GetAllVessels() {
        //this._cylinderService.GetAllVessels()
        //    .subscribe((_vessels: Models.Vessels[]) => {
        //        var _vessels1: Models.Vessels[]
        //        _vessels1 = JSON.parse(_vessels.toString());
        //        this.InsertVesslsData(_vessels1);
        //    }, error => this.errorMessage = <any>error);

        var d = new Date();
        var year = d.getFullYear();
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

        this.busy = this._cylinderService.getAllCustomersByuser(this.userInfodata.userID)
            .subscribe((_customer: Models.Customer[]) => {
                this.InsertCustomerData(_customer);
            }, error => this.errorMessage = <any>error);
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
        event.preventDefault();
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
        this.busy = this._cylinderService.getCylindersByUserSearch(this.objOrderSearch)
            .subscribe((_cylinders: Models.Cylinder[]) => {
                var _cylinders1: Models.Cylinder[];
                _cylinders1 = JSON.parse(_cylinders.toString());
                this.InsertData(_cylinders1);
                this.gridView = {
                    data: _cylinders1.slice(this.skip, this.skip + this.pageSize),
                    total: _cylinders1.length
                }
            }, error => this.errorMessage = <any>error);
    }
}