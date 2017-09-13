export namespace Models {
    export interface Order {
        ORDER_ID: number;
        ORDER_NO: string;
        VESSEL_ID: string;
        VESSEL_NAME: string;
        PORT_NAME: string;
        CUSTOMER_PO_NO: string;

        ORDER_DATE: string;
        VESSEL_ETA: string;
        DELIVERY_Date: Date;
        ORDER_Status: string;
        DELETED: boolean;
        CREATEDBY: string;
        CREATEDDATE: Date;
        MODIFIEDBY: string;
        MODIFIEDDATE: Date;
        CUSTOMER_ID: string;
        CUSTOMER_NAME: string;
    }

    export interface Cylinder {

        ID: number;
        Cylinder_ID: string;
        IFS_ORDER_NO: string;
        VESSEL_NAME: string;
        CYLINDER_NAME: string;
        Serial_No: string;
        Date_OF_Delivery: Date;
        Port_Of_Delivery: string;
        Deleted: boolean;
        CreatedBy: string;
        CreatedDate: Date;
        ModifiedBy: string;
        ModifiedDate: Date;
        ORDER_Status: string;
        ORDER_NO: string;
    }

    export interface UserLoggedInInfo {
        userID: string;
        userName: string;
        userRole: string;
        userFName: string;
        userEmail: string;
        userDeleted: boolean;
        userPhoneNo: string;
        userType: string;
    }

    export interface UserToCustomer {
        ID: string;
        USER_ID: string;
        FULL_NAME: string;
        PASSWORD: string;
        PHONE: string;
        EMAIL: string;
        CREATE_TIME_STAMP: Date;
        CREATE_NAME: string;
        MODIFIERS_NAME: string;
        MODIFY_TIME_STAMP: Date;
        DELETED: boolean;
        MAPPED: boolean;
    }

    export interface OrderDetails {
        ORDER_LINE_ID: number;
        ORDER_ID: string;
        PART_DESC: string;
    }

    export interface MappedUsersInfo {
        mapID: number,
        mapCustID: number,
        mapUsrID: number,
        userName: string,
        userType: number,
        userFName: string;
        userID: number;
        isMapped: boolean;
    }

    export interface Vessels {
        ID: number,
        VESSEL_ID: string,
        VESSEL_NAME: string
        DELETED: boolean,
        CREATEDBY: string,
        CREATEDDATE: Date,
        MODIFIEDBY: string,
        MODIFIEDDATE: Date
    }

    export class JSONReturnVM<T> {
        haserror: boolean;
        errormessage: string;

    }

    export interface Customer {
        ID: number,
        CUSTOMER_ID: string,
        CUSTOMER_NAME: string,
        CREATED_DATE: Date,
        MODIFIED_DATE: Date,
        E_MAIL: string,
        PHONE_NUMBER: string,
        FAX: string,
        ADDRESS: string
    }

    export interface User {
        ID: number,
        USER_ID: string,
        FULL_NAME: string,
        PASSWORD: string,
        PHONE: string,
        E_MAIL: string,
        CREATE_TIME_STAMP: Date,
        CREATE_NAME: string,
        MODIFIERS_NAME: string,
        MODIFY_TIME_STAMP: Date,
        DELETED: boolean,
        USER_TYPE: number;
    }

    export class OrderSearch {
        UserID: string;
        VesselID: string;
        MonthNo: string;
        YearNo: string;
        CustomerID: string;
        History: string;
        OrderNo: string;
    }

    export class PortalYears {
        YearNo: string;
        Year: string;
    }
    export class PortalMonth {
        MonthNo: string;
        Month: string;
    }
    export class PortalChart {
        OrderStatus: string;
        Result: string;
        Percentage: string;
    }
    //export class CustWisePortalChart {
    //    CUSTOMER_ID: string;
    //    Delivered: string;
    //    Invoiced: string;
    //    PartiallyDelivered: string;
    //    Picked: string;
    //    Released: string;
    //    Planned: string;
    //    Cancelled: string;
    //}

    export class WidgetData {
        //Delivered: number;
        //Invoiced: number;
        //PartiallyDelivered: number;
        //Picked: number;
        //Released: number;
        //Planned: number;
        //Cancelled: number;
        //Total: number;
        CustomerCount: number;
        OrderCount: number;
        CylinderCount: number;
    }

    export interface CustWisePortalChart {
        CustomerID: string;
        //OrderStatus: string;
        Result: number;
    }
    export const Months = [
        {
            "MonthNo": 1,
            "MonthName": "January"
        },
        {
            "MonthNo": 2,
            "MonthName": "February"
        },
        {
            "MonthNo": 3,
            "MonthName": "March"
        },
        {
            "MonthNo": 4,
            "MonthName": "April"
        },
        {
            "MonthNo": 5,
            "MonthName": "May"
        },
        {
            "MonthNo": 6,
            "MonthName": "June"
        },
        {
            "MonthNo": 7,
            "MonthName": "July"
        },
        {
            "MonthNo": 8,
            "MonthName": "August"
        },
        {
            "MonthNo": 9,
            "MonthName": "September"
        },
        {
            "MonthNo": 10,
            "MonthName": "October"
        },
        {
            "MonthNo": 11,
            "MonthName": "November"
        },
        {
            "MonthNo": 12,
            "MonthName": "December"
        }]
    export const Years = [
        {
            "YearNo": 2010,
            "Year": 2010
        },
        {
            "YearNo": 2011,
            "Year": 2011
        },
        {
            "YearNo": 2012,
            "Year": 2012
        },
        {
            "YearNo": 2013,
            "Year": 2013
        },
        {
            "YearNo": 2014,
            "Year": 2014
        },
        {
            "YearNo": 2015,
            "Year": 2015
        },
        {
            "YearNo": 2016,
            "Year": 2016
        },
        {
            "YearNo": 2017,
            "Year": 2017
        },
    ]

}