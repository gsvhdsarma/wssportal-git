import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { Models } from '../../Model/model';
import { WSSPortalServiceList } from '../../Services/wssportservicelist.service';
import { GridDataResult, GridComponent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { filterBy, FilterDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { SortDescriptor, orderBy, process, State } from '@progress/kendo-data-query'

@Component({
    selector: 'cylinderDetail',
    providers: [WSSPortalServiceList],
    templateUrl: './cylinderdetail.component.html'
})
export class CylinderDetailComponent implements OnInit {
    @Input() public cylinder: Models.Cylinder;
    _objcylinders: Models.Cylinder;
    public gridView1: GridDataResult;
    
    constructor(public _orderService: WSSPortalServiceList) {
        
    }
    ngOnInit() {        
        var _objCylinder: Models.Cylinder[] = [];
        _objCylinder.push(this.cylinder);
        this.gridView1 = {
            data: _objCylinder,
            total: _objCylinder.length
        }
    }   
}