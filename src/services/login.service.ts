import { Injectable, Inject } from '@angular/core';
import { HttpClientService } from '../providers/http-client.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class LoginService extends HttpClientService {
    constructor(@Inject(HttpClient) http) {
        super(http);
    }
    Login(params) {
        const reqUrl = '/login';
        return this.post(reqUrl, params);
    }
}
