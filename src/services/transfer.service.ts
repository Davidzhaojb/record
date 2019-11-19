import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/providers/http-client.service';

@Injectable()
export class TransferService {

    constructor(
        private http: HttpClientService,
    ) { }
    /**
     * @params 帐变记录
     * @param author David 2019-11-15
     */
    getChangeRecord(obj) {
        const reqUrl = 'api/Report/Change?startDate=' + obj.startDate + '&endDate=' +
            obj.endDate + '&typeCode=' + obj.typeCode + '&pageSize=' + obj.pageSize + '&pageIndex=' + obj.pageIndex +
            '&lotteryName=' + obj.lotteryName + '&bettingId=' + obj.bettingId + '&userName=' + obj.userName;
        return this.http.get(reqUrl);
    }
    /**
     * @params 团队帐变列表
     * @param author David 2019-11-15
     */
    queryTeamChange(obj) {
        const reqUrl = 'api/Team/QueryTeamChange?userName=' + obj.subUserName + '&start=' +
            obj.startDate + '&end=' + obj.endDate + '&typeCode=' + obj.typeCode + '&pageSize=' + obj.pageSize +
            '&pageIndex=' + obj.pageIndex;
        return this.http.get(reqUrl);
    }
    /**
     * @params 获取所有的账单类型
     * @param author David 2019-11-15
     */
    getChangeType() {
        const reqUrl = 'api/Report/ChangeType';
        return this.http.get(reqUrl);
    }
}


