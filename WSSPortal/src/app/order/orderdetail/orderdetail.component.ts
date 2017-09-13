import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { Models } from '../../Model/model';
import { WSSPortalServiceList } from '../../Services/wssportservicelist.service';
import { GridDataResult, GridComponent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { filterBy, FilterDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { SortDescriptor, orderBy, process, State } from '@progress/kendo-data-query'
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs';

@Component({
    selector: 'orderDetail',
    providers: [WSSPortalServiceList],
    templateUrl: './orderdetail.component.html'
})
export class OrderDetailComponent implements OnInit {
    public pageSize: number = 8;
    public skip: number = 0;
    public gridView: GridDataResult;
    errorMessage: string;
    public filter: CompositeFilterDescriptor;
    public _objOrderDetails: Models.OrderDetails[];
    public _objInitOrderDetails: Models.OrderDetails[];
    orderID: string;
    @Input() public order: Models.Order;
    busy: Subscription;

    constructor(public _orderService: WSSPortalServiceList) {
    }
    ngOnInit() {
        this.getOrderDetail();
    }

    protected pageChange({ skip, take }: PageChangeEvent): void {
        this.skip = skip;
        this.pageSize = take;
        //this.getOrders();
        this.gridView = {
            data: this._objOrderDetails.slice(this.skip, this.skip + this.pageSize),
            total: this._objOrderDetails.length
        }
    }

    getOrderDetail() {
        this.busy = this._orderService.getOrderDetail(this.order.ORDER_NO)
            .subscribe((_orderdetails: Models.OrderDetails[]) => {
                this.InsertData(_orderdetails);
                this.gridView = {
                    data: _orderdetails.slice(this.skip, this.skip + this.pageSize),
                    total: _orderdetails.length
                }
            }, error => this.errorMessage = <any>error);
    }

    public InsertData(_orderdetails: Models.OrderDetails[]) {
        this._objOrderDetails = _orderdetails;
        this._objInitOrderDetails = _orderdetails;
        this.LoadFilteredData(this._objOrderDetails);
    }


    public filterChange(filter: CompositeFilterDescriptor): void {
        this.filter = filter;
        var filteredData: any[];
        if (filter.filters.length > 0) {
            if (filter.filters.length == 1) {
                var fd: FilterDescriptor;
                fd = <FilterDescriptor>filter.filters[0];
                if (fd.value == "") {
                    this.LoadFilteredData(this._objInitOrderDetails);
                    return;
                }
            }
        }
        else {
            this.LoadFilteredData(this._objInitOrderDetails);
            return;
        }
        this.LoadFilteredData(filterBy(this._objInitOrderDetails, filter));
    }

    public LoadFilteredData(objModel: Models.OrderDetails[]): void {
        this.gridView =
            {
                data: objModel.slice(this.skip, this.skip + this.pageSize),
                total: objModel.length
            }
        this._objOrderDetails = objModel;
    }

}