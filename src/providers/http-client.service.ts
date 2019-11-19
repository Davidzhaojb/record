import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpClientService {
    constructor(private httpClient: HttpClient) { }

    /**
     * http get请求
     * Evan 2019-10-23
     * @param url 请求Url或者API地址
     * @param options 请求需要参数
     */
    public get(url: string, options?: any): Observable<any> {
        return this.httpClient.get<any>(url, { params: options }).pipe();
    }

    public post(url: string, body: any): Observable<any> {
        return this.httpClient.post(url, body).pipe();
    }
}
