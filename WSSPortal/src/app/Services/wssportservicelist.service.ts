import { HttpHelpers } from '../utils/HttpHelpers';
import { Models } from '../Model/model';
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as AppConfig from '../app.config';

@Injectable()
export class WSSPortalServiceList {

    private baseUrl = "";
    
    private _getOrderByUserUrl = "";
    private _getOrderDetailsUrl = "";
    private _getOrderListUrl = "";
    private _getOrderByUserSearchUrl = "";

    private _getCylinderListUrl = "";
    private _getCylinderByUserSearchUrl = "";

    private _getUsersUrl = "";
    private _getUsersByUserTypeUrl = "";
    private _disableUserUrl = ""
    private _createUserUrl = ""
    private _changePasswordUrl = ""
    private _resetPasswordUrl = ""
    private _enableUserUrl = ""
    private _getcustInfoForMapUrl = ""

    private _getVesslsUrl = "";
    private _getVesslsByUsrCustUrl = "";

    private _getCustomersUrl = "";
    private _getCustomersByuserUrl = "";

    private _getChartsOrdersByUserSearchUrl = "";
    private _getOrdersCustSummaryByUserUrl = "";
    private _getWidgetDataByUserUrl=""

    private _getUserInfoUrl = "";

    data: string;      

    setURL() {
        this.baseUrl = AppConfig.WEBAPI_URL;

        this._getOrderByUserUrl = this.baseUrl + 'Order/GetOrdersByUser';
        this._getOrderDetailsUrl = this.baseUrl + 'Order/GetOrderDetails';
        this._getOrderListUrl = this.baseUrl + 'Order/GetAllOrders';
        this._getOrderByUserSearchUrl = this.baseUrl + 'Order/GetOrdersByUserSearch';

        this._getCylinderListUrl = this.baseUrl + 'cylinder/GetAllCylinders';
        this._getCylinderByUserSearchUrl = this.baseUrl + 'cylinder/GetCylinderByUserSearch';

        this._getUsersUrl = this.baseUrl + 'User/GetAllUsers';
        this._getUsersByUserTypeUrl = this.baseUrl + 'User/GetUsersByUserType';
        this._disableUserUrl = this.baseUrl + 'User/Disable';
        this._createUserUrl = this.baseUrl + 'User/Create';
        this._changePasswordUrl = this.baseUrl + 'User/ChangePassword';
        this._resetPasswordUrl = this.baseUrl + 'User/ResetPassword';
        this._enableUserUrl = this.baseUrl + 'User/EnableUser';
        this._getcustInfoForMapUrl = this.baseUrl + 'User/custInfoForMap';

        this._getVesslsUrl = this.baseUrl + 'Order/GetAllVessels';
        this._getVesslsByUsrCustUrl = this.baseUrl + 'Order/GetVesselsByUsrCust';

        this._getCustomersUrl = this.baseUrl + 'Customer/GetAllCustomers';
        this._getCustomersByuserUrl = this.baseUrl + 'Customer/GetAllCustomersByuser';

        this._getChartsOrdersByUserSearchUrl = this.baseUrl + 'Charts/GetOrdersSummaryByUser';
        this._getOrdersCustSummaryByUserUrl = this.baseUrl + 'Charts/GetOrdersCustSummaryByUser';
        this._getWidgetDataByUserUrl = this.baseUrl + 'Charts/GetWidgetDataByUser';

        this._getUserInfoUrl = this.baseUrl + 'Login/GetUserInfo'; 
    }
    constructor(private http: Http) {
        this.setURL();
    }   
    getCylinders(): Observable<Models.Cylinder[]> {
        let headers = new Headers({ 'Authorization': 'bearer ' + sessionStorage.getItem('acessToken') });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this._getCylinderListUrl, options)
            // .map(this.extractData)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getCylindersByUserSearch(orderSearch: Models.OrderSearch): Observable<Models.Cylinder[]> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + sessionStorage.getItem('acessToken') });        
        let options = new RequestOptions({ headers: headers });
        var jsonstring = JSON.stringify(orderSearch);

        return this.http.post(this._getCylinderByUserSearchUrl, "'" + jsonstring + "'", options)
            // .map(this.extractData)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getOrders(): Observable<Models.Order[]> {
        let headers = new Headers({ 'Authorization': 'bearer ' + sessionStorage.getItem('acessToken') });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this._getOrderListUrl, options)
            // .map(this.extractData)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getOrderDetail(orderNO: string): Observable<Models.OrderDetails[]> {
        let headers = new Headers({ 'Authorization': 'bearer ' + sessionStorage.getItem('acessToken') });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this._getOrderDetailsUrl + '/' + orderNO, options)
            // .map(this.extractData)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getOrdersByUser(userID: string): Observable<Models.Order[]> {
        let headers = new Headers({ 'Authorization': 'bearer ' + sessionStorage.getItem('acessToken') });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this._getOrderByUserUrl + '/' + userID)
            // .map(this.extractData)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getOrdersByUserSearch(orderSearch: Models.OrderSearch): Observable<Models.Order[]> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + sessionStorage.getItem('acessToken') });
        let options = new RequestOptions({ headers: headers });
        var jsonstring = JSON.stringify(orderSearch);

        return this.http.post(this._getOrderByUserSearchUrl , "'" + jsonstring + "'", options)        
            // .map(this.extractData)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getWidgetDataByUser(userID: string): Observable<Models.WidgetData> {
        let headers = new Headers({ 'Authorization': 'bearer ' + sessionStorage.getItem('acessToken') });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this._getWidgetDataByUserUrl + '/' + userID, options)
            // .map(this.extractData)
            .map(response => response.json())
            .catch(this.handleError);
        
    }      

    getCustomers(): Observable<Models.Customer[]> {
        let headers = new Headers({ 'Authorization': 'bearer ' + sessionStorage.getItem('acessToken') });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this._getCustomersUrl, options)
            // .map(this.extractData)
            .map(response => response.json())
            .catch(this.handleError);
    }    

    getAllCustomersByuser(userID: string): Observable<Models.Customer[]> {
        let headers = new Headers({ 'Authorization': 'bearer ' + sessionStorage.getItem('acessToken') });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this._getCustomersByuserUrl + '/' + userID, options)
            // .map(this.extractData)
            .map(response => response.json())
            .catch(this.handleError);
    }    

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }       
        //console.error(errMsg);
        return Observable.throw(errMsg);
    }

    SelectedList: Models.Cylinder;

    getUsers(): Observable<Models.User[]> {
        let headers = new Headers({ 'Authorization': 'bearer ' + sessionStorage.getItem('acessToken') });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this._getUsersUrl, options)
            // .map(this.extractData)
            .map(response => response.json())
            .catch(this.handleError);
    }

    disableAUser(userID: string): Observable<any> {        
        let headers = new Headers({ 'Authorization': 'bearer ' + sessionStorage.getItem('acessToken') });
        let options = new RequestOptions({ headers: headers });
        let creds = JSON.stringify({ username: userID });

        return this.http.post(this._disableUserUrl + '/' + userID, creds.toString(), options)
            // .map(this.extractData)
            .map(response => response.json())
            .catch(this.handleError);
    }

    createUser(userInfo: Models.User): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + sessionStorage.getItem('acessToken') });
        let options = new RequestOptions({ headers: headers });
        let creds = userInfo;

        return this.http.post(this._createUserUrl, creds, options)           
            .map(response => response.json())
            .catch(this.handleError);
    } 

    changePassword(userInfo: Models.User, userID: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + sessionStorage.getItem('acessToken') });
        let options = new RequestOptions({ headers: headers });
        let creds = userInfo;

        return this.http.post(this._changePasswordUrl + '/' + userID, creds, options)
            .map(response => response.json())
            .catch(this.handleError);
    } 

    resetPassword4AUsr(userID: string): Observable<any> {        
        var password = this.baseUrl = AppConfig.ResetPassword;         
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + sessionStorage.getItem('acessToken') });
        let options = new RequestOptions({ headers: headers });
        let creds = JSON.stringify({ username: userID, password: password });        

        return this.http.post(this._resetPasswordUrl, creds, options)
            .map(response => response.json())
            .catch(this.handleError);
    } 

    enableAUser(userID: string): Observable<any> {
        let headers = new Headers({ 'Authorization': 'bearer ' + sessionStorage.getItem('acessToken') });
        let options = new RequestOptions({ headers: headers });
        let creds = JSON.stringify({ username: userID });

        return this.http.post(this._enableUserUrl + '/' + userID,'', options)
            // .map(this.extractData)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getUsersByUserType(userID: string): Observable<Models.UserToCustomer[]> {
        let headers = new Headers({ 'Authorization': 'bearer ' + sessionStorage.getItem('acessToken') });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this._getUsersByUserTypeUrl + '/' + userID, options)
            // .map(this.extractData)
            .map(response => response.json())
            .catch(this.handleError);
    }


    GetAllVessels(): Observable<Models.Vessels[]> {
        let headers = new Headers({ 'Authorization': 'bearer ' + sessionStorage.getItem('acessToken') });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this._getVesslsUrl, options)
            // .map(this.extractData)
            .map(response => response.json())
            .catch(this.handleError);
    }

    GetVesselsByUsrCust(userID: string, custID: string, vessType: string): Observable<Models.Vessels[]> {
        let headers = new Headers({ 'Content-Type': 'application/json','Authorization': 'bearer ' + sessionStorage.getItem('acessToken') });
        let options = new RequestOptions({ headers: headers });
        let creds = JSON.stringify({ userID: userID, custID: custID, vessType: vessType });

        return this.http.post(this._getVesslsByUsrCustUrl, creds.toString(), options)
            // .map(this.extractData)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getChartsOrdersByUserSearch(userID: string): Observable<Models.PortalChart[]> {
        let headers = new Headers({ 'Authorization': 'bearer ' + sessionStorage.getItem('acessToken') });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this._getChartsOrdersByUserSearchUrl + '/' + userID, options)
            // .map(this.extractData)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getOrdersCustSummaryByUser(userID: string): Observable<any[]> {
        let headers = new Headers({ 'Authorization': 'bearer ' + sessionStorage.getItem('acessToken') });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this._getOrdersCustSummaryByUserUrl + '/' + userID, options)
            // .map(this.extractData)
            .map(response => response.json())
            .catch(this.handleError);
    }   

    getUserInfo(userID: string, password: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let creds = JSON.stringify({ username: userID, password: password });

        return this.http.post(this._getUserInfoUrl, creds.toString(), options)
        //return this.http.post(this._getUserInfoUrl + '/' + userID + '/' + password, { body }, options)
            // .map(this.extractData)
            .map(response => response.json())
            .catch(this.handleError);
    }  

    custInfoForMap(userID: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let creds = JSON.stringify({ username: userID});

        return this.http.post(this._getcustInfoForMapUrl, creds.toString(), options)
            //return this.http.post(this._getUserInfoUrl + '/' + userID + '/' + password, { body }, options)
            // .map(this.extractData)
            .map(response => response.json())
            .catch(this.handleError);
    }  

}