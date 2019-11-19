import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/providers/http-client.service';

@Injectable()
export class WithDrawService {
    constructor(
        private http: HttpClientService,
    ) { }
    /**
     * @params 获取用户的提现记录报表
     * @param author David 2019-11-12
     */
    getWithdrawRecord(userName: string, startDate: string, endDate: string, pageSize: number, pageIndex: number) {
        const reqUrl = 'api/User/Cash?userName=' + userName + '&startDate=' + startDate + '&endDate=' + endDate +
            '&pageSize=' + pageSize + '&pageIndex=' + pageIndex;
        return this.http.get(reqUrl);
    }
}
