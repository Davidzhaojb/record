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
    /**
     * @params 登录
     * @param author David 2019-10-23
     */
    login(signinInfo) {
        // tslint:disable-next-line: deprecation
        const loginParams = new URLSearchParams();
        for (const key in signinInfo) {
            if (signinInfo.hasOwnProperty(key)) {
                const element = signinInfo[key];
                loginParams.append(key, element);
            }
        }
        const reqUrl = '/api/token';
        return this.post(reqUrl, loginParams.toString());
    }
    /**
     * @params 根据tocken获取用户信息
     * @param author David 2019-10-23
     */
    getUserModel() {
        const reqUrl = '/api/User/GetUserModel';
        return this.get(reqUrl);
    }
}
