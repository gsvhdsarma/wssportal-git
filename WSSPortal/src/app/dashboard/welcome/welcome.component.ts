import { Component, OnInit } from '@angular/core';
import { WSSPortalServiceList } from '../../Services/wssportservicelist.service';
import { Models } from '../../Model/model';
import { Subscription } from 'rxjs';
import { groupBy, GroupResult } from '@progress/kendo-data-query';
import 'hammerjs';
import { NavbarService } from '../../Services/navbar.service';
import { SharedService } from '../../Services/shared-service';

@Component({
    selector: 'welcome',
    providers: [WSSPortalServiceList],
      templateUrl: './welcome.component.html',
    // styleUrls: ['../Style/style-wss.css']
})

export class WelcomeComponent {

    data: string;
    userInfodata: Models.UserLoggedInInfo;
    busy: Subscription;
    errorMessage: string;
    public chartData: Models.PortalChart[];
    public custwiseOrderStatuschartData: Models.CustWisePortalChart[];
    public widgetData: Models.WidgetData;
    public series: any[];
    Math: any;
    //public Delivered: number;
    //public Invoiced: number;
    //public PartiallyDelivered: number;
    //public Picked: number;
    //public Released: number;
    //public Planned: number;
    //public Cancelled: number;
    //public Total: number;

    //public DeliveredOrders: number;
    //public InvoicedOrders: number;
    //public PartiallyDeliveredOrders: number;
    //public PickedOrders: number;
    //public ReleasedOrders: number;
    //public PlannedOrders: number;
    //public CancelledOrders: number;
    public CustomerCount: number;
    public OrderCount: number;
    public CylinderCount: number;

    constructor(public _WSSService: WSSPortalServiceList, public nav: NavbarService, private _sharedService: SharedService) {
        this.Math = Math;
        this.getUserInfoData();

    }
    ngOnInit() {
        this.nav.show();
        this._sharedService.emitChange(this.userInfodata);
        /*this.getOrdersCustSummaryByUser();*/
        this.getChartsOrdersByUserSearch();
        this.getWidgetData();
    }

    getWidgetData() {
        this.busy = this._WSSService.getWidgetDataByUser(this.userInfodata.userID)
            .subscribe((_widgetData: Models.WidgetData) => {
                var _parsedData = JSON.parse(_widgetData.toString());
                this.InsertWidgetData(_parsedData);
            }, error => this.errorMessage = <any>error);
    }

    InsertWidgetData(_widgetData: Models.WidgetData) {
        this.widgetData = _widgetData[0];
        this.CustomerCount = this.widgetData.CustomerCount;
        this.OrderCount = this.widgetData.OrderCount;
        this.CylinderCount = this.widgetData.CylinderCount;

        //this.Total = this.widgetData.Total;
        //this.Delivered = this.Math.round((this.widgetData.Delivered / this.Total) * 100);
        //this.Invoiced = this.Math.round((this.widgetData.Invoiced / this.Total) * 100);
        //this.PartiallyDelivered = this.Math.round((this.widgetData.PartiallyDelivered / this.Total) * 100);
        //this.Picked = this.Math.round((this.widgetData.Picked / this.Total) * 100);
        //this.Released = this.Math.round((this.widgetData.Released / this.Total) * 100);
        //this.Planned = this.Math.round((this.widgetData.Planned / this.Total) * 100);
        //this.Cancelled = this.Math.round((this.widgetData.Cancelled / this.Total) * 100);

        //this.DeliveredOrders = this.widgetData.Delivered ;
        //this.InvoicedOrders = this.widgetData.Invoiced;
        //this.PartiallyDeliveredOrders = this.widgetData.PartiallyDelivered;
        //this.PickedOrders = this.widgetData.Picked;
        //this.ReleasedOrders = this.widgetData.Released;
        //this.PlannedOrders = this.widgetData.Planned;
        //this.CancelledOrders = this.widgetData.Cancelled;
    }

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

    getChartsOrdersByUserSearch() {
        this.busy = this._WSSService.getChartsOrdersByUserSearch(this.userInfodata.userID)
            .subscribe((_chartData: any[]) => {
                var _parsedData = JSON.parse(_chartData.toString());
                this.InsertData(_parsedData);
            }, error => this.errorMessage = <any>error);

    }

    //getOrdersCustSummaryByUser() {
    //    this.busy = this._WSSService.getOrdersCustSummaryByUser(this.userInfodata.userID)
    //        .subscribe((_chartData: any[]) => {
    //            var _parsedData = JSON.parse(_chartData.toString());
    //            this.InserCustomerWiseOrderStatusData(_parsedData);
    //        }, error => this.errorMessage = <any>error);
    //}

    public InsertData(_chartData: any[]) {
        this.chartData = _chartData;
    }

    //public InserCustomerWiseOrderStatusData(_chartData: Models.CustWisePortalChart[]) {
    //    this.custwiseOrderStatuschartData = _chartData;
    //}
}