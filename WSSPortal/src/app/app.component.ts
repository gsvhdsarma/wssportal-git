import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Directive, HostListener } from "@angular/core";
import { NavbarService } from './Services/navbar.service';
import { Router } from '@angular/router';

declare var aspData: any;
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    isAdmin: string;
    userFname: string;
    className: string;
    key: any;
    isLoginPage: string;
    userInfodata: any;
    constructor(public nav: NavbarService, private activeRouter: Router,
        private el: ElementRef) {
        this.activeRouter.events.subscribe(
            data => {
              this.changeBodyClass(data);
            })
    }

    ngOnInit() {
        this.nav.hide();  
        
    }

    changeBodyClass(data: any) {
        this.className = data.url;
        if (this.el.nativeElement.parentElement.parentElement.nodeName === 'BODY') {
            if (this.className != undefined) {
                //this.getUserInfoData();
                
                if (this.className == "/" || this.className.toString().startsWith("/welcome") || this.className.toString().startsWith("/order") || this.className.toLowerCase().startsWith("/cylinderdetails") ||
                    this.className.startsWith("/customer") || this.className.startsWith("/supplychain") || this.className.startsWith("/users") || this.className.startsWith("/usersAddEdit") || this.className.startsWith("/changePassword") ||
                    this.className.startsWith("/userToCustomer")) {

                    this.el.nativeElement.parentElement.parentElement.className = "portalbody";
                    this.el.nativeElement.children.pagewrap.lastElementChild.childNodes[0].className = "bottomFooter"
                    this.el.nativeElement.style.padding = "0px 30px 0px 30px";
                    //this.isLoginPage = 'Last Updated Date/Time:';//Last Ordered Time:DD:MM:YYYY HH:MM:SS
                    //this.getLastOrderedInfo();
                } else {
                    this.el.nativeElement.parentElement.parentElement.className = "indexbody";
                    this.el.nativeElement.children.pagewrap.lastElementChild.childNodes[0].className = "bottomFooterLogin";
                    this.el.nativeElement.style.padding = "0px";
                   // this.isLoginPage = '';//Last Ordered Time:DD:MM:YYYY HH:MM:SS
                }
            }

        }
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

    getLastOrderedInfo() {
        //this.busy = this._WSSService.getWidgetDataByUser(this.userInfodata.userID)
        //    .subscribe((_widgetData: Models.WidgetData) => {
        //        var _parsedData = JSON.parse(_widgetData.toString());
        //        this.InsertWidgetData(_parsedData);
        //    }, error => this.errorMessage = <any>error);
        this.isLoginPage += '17-08-2017 12:00:00';
    }
}
