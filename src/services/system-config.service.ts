import { Injectable } from '@angular/core';
import { HttpClientService } from '../providers/http-client.service';
import { StorageService } from 'src/providers/storage.service';

@Injectable()
export class SystemconfigService {
    constructor(
        private http: HttpClientService,
        private storage: StorageService
    ) { }
    /**
     * @params 获取客服地址
     * @param author David 2019-10-24
     */
    getServiceHall() {
        const reqUrl = 'api/System/ServiceHall';
        return this.http.get(reqUrl);
    }
    /**
     * @params 获取所有线路
     * @param author David 2019-10-24
     */
    getPlatformLineList() {
        const reqUrl = 'api/System/GetPlatformLineList';
        return this.http.get(reqUrl);
    }
    /**
     * @params 获取协议与条款
     * @param author David 2019-10-24
     */
    getAgreement() {
        const reqUrl = 'api/System/GetAgreement';
        return this.http.get(reqUrl);
    }
    /**
     * @params 获取系统配置
     * @param author David 2019-10-01
     */
    getSysconfig() {
        const reqUrl = 'api/System/SysConfig';
        return this.http.get(reqUrl);
    }
    /**
     * @params 获取手机端轮播图
     * @param author David 2019-10-25
     */
    getMobileCarousel() {
        const reqUrl = 'api/System/GetMobileHomePic';
        return this.http.get(reqUrl);
    }
    /**
     * @params 退出
     * @param author David 2019-10-26
     */
    logOut() {
        const param = '';
        const reqUrl = 'api/Log/LogoutDeleteTonken';
        return this.http.post(reqUrl, param);
    }
    /**
     * @params 获取公告列表
     * @param author David 2019-10-28
     */
    getAnnounces() {
        const reqUrl = 'api/Article/GetAnnouncements';
        return this.http.get(reqUrl);
    }

    getLotterysModel() {
        // tslint:disable-next-line: ban-types
        const data = this.storage.read<Object[]>('lotterys');
        if (data == null) {
            return null;
        }
        const formatData = {};
        const lotterys = [];
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < data.length; i++) {
            // tslint:disable-next-line: no-string-literal
            let detail = formatData[data[i]['LotteryType']];
            if (!detail) {
                // tslint:disable-next-line: no-string-literal
                detail = formatData[data[i]['LotteryType']] = {
                    // tslint:disable-next-line: no-string-literal
                    code: data[i]['LotteryType'],
                    // tslint:disable-next-line: no-string-literal
                    name: data[i]['LotteryTypeName'],
                    plays: []
                };
                lotterys.push(detail);
            }
            // tslint:disable-next-line: no-string-literal
            detail['plays'].push(data[i]);
        }
        return lotterys;
    }
}
