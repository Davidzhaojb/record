import { Injectable } from '@angular/core';
import { HttpClientService } from '../providers/http-client.service';
@Injectable()
export class UserBankService {
    constructor(
        private http: HttpClientService,
    ) { }

    /**
     * @params 判断是否有银行卡，有则返回持卡人姓名
     * @param author David 2019-11-11
     */
    getUserBankUserName() {
        const reqUrl = 'api/User/GetUserBankUserName';
        return this.http.get(reqUrl);
    }

    /**
     * @params 获取用户银行信息
     * @param author David 2019-11-11
     */
    getUserBanks(pageIndex: number, pageSize: number) {
        const param = 'pageIndex=' + pageIndex + '&pageSize=' + pageSize;
        const reqUrl = 'api/User/GetUserBanks';
        return this.http.get(reqUrl + '?' + param);
    }

    /**
     * @params 设为默认银行
     * @param author David 2019-11-11
     */
    setDefaultBank(bankid) {
        const param = 'id=' + bankid;
        const reqUrl = 'api/User/SetDefaultCard';
        return this.http.get(reqUrl + '?' + param);
    }


    /**
     * @params 验证用户是否绑定银行卡
     * @param author David 2019-11-11
     */
    getUserBank() {
        const reqUrl = 'api/User/ExistUserBank';
        return this.http.get(reqUrl);
    }

    /**
     * @params 查询可提现的银行列表
     * @param author David 2019-11-11
     */
    queryDrawBanks() {
        const reqUrl = 'api/User/QueryDrawBanks';
        return this.http.get(reqUrl);
    }

    /**
     * @params 省列表
     * @param author David 2019-11-11
     */
    proList() {
        const reqUrl = 'api/User/ProList';
        return this.http.get(reqUrl);
    }

    /**
     * @params 市列表
     * @param author David 2019-11-11
     */
    cityList(procode: string) {
        const reqUrl = 'api/User/CityList?proCode=' + procode;
        return this.http.get(reqUrl);
    }

    /**
     * @params 区列表
     * @param author David 2019-11-11
     */
    areaList(cityCode: string) {
        const reqUrl = 'api/User/AreaList?cityCode=' + cityCode;
        return this.http.get(reqUrl);
    }

    /**
     * @params 添加银行卡
     * @param author David 2019-11-11
     */
    addUserBank(bank) {
        const reqUrl = 'api/User/AddUserBank';
        return this.http.post(reqUrl, bank);
    }
}

