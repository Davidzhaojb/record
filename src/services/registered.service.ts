import { Injectable, Inject } from '@angular/core';
import { HttpClientService } from '../providers/http-client.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class RegisterService extends HttpClientService {
    constructor(@Inject(HttpClient) http) {
        super(http);
    }
    /**
     * @params 注册
     * @param author David 2019-11-20
     */
    register(params) {
        const reqUrl = '/register';
        return this.post(reqUrl, params);
    }
}
