import { Injectable } from '@angular/core';
import { Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticatedHttpService extends Http {

    constructor(backend: XHRBackend, defaultOptions: RequestOptions, public _router: Router) {
        super(backend, defaultOptions);
         
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options).catch((error: Response) => {
            //console.log(error.status);
            //console.log(localStorage.getItem('currentUser'));
            if ((error.status === 401 || error.status === 403)) { //&& (window.location.href.match(/\?/g) || []).length < 2) {
                //console.log('The authentication session expires or the user is not authorised. Force refresh of the current page.');
                //window.location.href = window.location.href + '?' + new Date().getMilliseconds();
                var obj = localStorage.getItem('currentUser');
                if (obj != null) {                
                    localStorage.removeItem('currentUser');
                    alert("Your session has been expired. Please re-login"); 
                    this._router.navigate(['login']);  
                }              
                  
            }
            return Observable.throw(error);
        });
    }
}