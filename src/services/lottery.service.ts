import { Injectable } from '@angular/core';
import { HttpClientService } from '../providers/http-client.service';
import { Observable } from 'rxjs';


@Injectable()
export class LotteryService {
    constructor(private http: HttpClientService) {
    }
    /**
     * @params 获取所有彩种
     * @param author David 2019-10-29
     */
    getLotterys() {
        const url = 'api/Lottery/GetLotterys';
        return this.http.get(url);
    }
    /**
     * 获取指定彩种编码玩法数据
     */
    getLotteryPlays(lotteryCode: string) {
        const url = '/api/Lottery/GetLottery?lotteryCode=' + lotteryCode;
        return this.http.get(url);
    }


    /**
     * @params 获取各种彩种最新的开奖号码
     * @param author David 2019-09-10
     */
    getLotteryOpenLatest() {
        const reqUrl = 'api/Lottery/GetLotteryOpenLatest';
        return this.http.get(reqUrl);
    }

    /**
     * @params 获取彩种的开奖号码
     * @param author David 2019-09-10
     */
    getLotteryOpen(lotteryCode: string, pageIndex: number = 1, pageSize: number = 30) {
        const reqUrl = 'api/Lottery/GetLotteryOpen?lotteryCode=' + lotteryCode + '&pageIndex=' + pageIndex + '&pageSize=' + pageSize;
        return this.http.get(reqUrl);
    }

    /**
     * @params : 六合彩换宵后的开奖记录
     * @param author David 2019-09-19
     */
    getSixSetting() {
        const reqUrl = 'api/Lottery/MarksixSettings';
        return this.http.get(reqUrl);
    }


    /**
     * @params 获取中奖名单
     * @param author david 2019--09-19
     */
    getWinningData(params) {
        const reqUrl = 'api/Report/GetWinningData';
        return this.http.get(reqUrl, params);
    }

    /**
     * 获取彩种期号信息
     */
    getIssue(lotteryCode: string) {
        const url = '/api/Lottery/GetIssue?lotteryCode=' + lotteryCode;
        return this.http.get(url);
    }
}

