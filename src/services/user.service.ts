import { Injectable } from '@angular/core';
import { HttpClientService } from '../providers/http-client.service';
@Injectable()
export class UserService {
    constructor(
        private http: HttpClientService

    ) { }
    /**
     * @params 获取用户余额
     * @param author David 2019-10-26
     */
    getUserMoney() {
        const requRul = 'api/User/GetUserMoney';
        return this.http.get(requRul);
    }
    /**
     * @params 查询是否可提现
     * @param author David 2019-11-11
     */
    getCashEnable() {
        const apiUrl = 'api/Index/QueryCashEnable';
        return this.http.get(apiUrl);
    }
    /**
     * @params 获取提现手续费
     * @param author David 2019-11-11
     */
    getServiceCharge() {
        const reqUrl = 'api/Index/GetWithdrawSetting';
        return this.http.get(reqUrl);
    }
    /**
     * @params 查询剩余提现次数
     * @param author David 2019-11-11
     */
    getCashTime() {
        const reqUrl = 'api/Index/QueryRemainCashTime';
        return this.http.get(reqUrl);
    }
    /**
     * @params 提交提现申请
     * @param author David 2019-11-11
     */
    getDrawMoney(moneyPwd: string, money: string, bankId: Number) {
        const param =
            'moneyPwd=' + moneyPwd + '&money=' + money + '&bankId=' + bankId;
        const reqUrl = 'api/Index/WithDrawMoney';
        return this.http.get(reqUrl + '?' + param);
    }
    /**
     * @params 获取用户最后登录信息
     * @param author David 2019-11-11
     */
    getUserLastLogin() {
        const reqUrl = 'api/User/GetUserLastLogin';
        return this.http.get(reqUrl);
    }
    /**
     * @params 获取用户登录信息
     * @param author David 2019-11-11
     */
    getLoginLog(param) {
        const reqUrl = 'api/User/UserLogs';
        const par =
            'endDate=' +
            param.endDate +
            '&pageIndex=' +
            param.pageIndex +
            '&pageSize=' +
            param.pageSize +
            '&startDate=' +
            param.startDate +
            '&userName=' +
            param.userName;
        return this.http.get(reqUrl + '?' + par);
    }
    /**
     * @params 验证是否设置资金密码
     * @param author David 2019-11-11
     */
    getCheckCreateMoney(params) {
        const reqUrl = 'api/User/CheckBankPassword';
        return this.http.post(reqUrl, params);
    }
    /**
     * @params 获取所有密保问题
     * @param author David 2019-11-11
     */
    getSecurityQuestions() {
        const apiUrl = 'api/User/GetSecurityQuestions';
        return this.http.get(apiUrl);
    }
    /**
     * @params 判断是否设置密保
     * @param author David 2019-11-11
     */
    ckkUserSecurityQuestion() {
        const apiUrl = 'api/User/CheckUserSecurityQuestion';
        return this.http.get(apiUrl);
    }
    /**
     * @params 设置密保
     * @param author David 2019-11-11
     */
    setSecurityInfo(question) {
        const apiUrl = 'api/User/SetUserSecurityInfo';
        return this.http.post(apiUrl, question);
    }

    /**
     * @params 验证密保是否正确
     * @param author David 2019-11-11
     */
    ckUserQuestion(question) {
        const apiUrl = 'api/Log/CkUserQuestion';
        return this.http.post(apiUrl, question);
    }
    /**
     * @params 严重用户资金密码
     * @param author David 2019-11-12
     */
    getUserVarify(bankPassW: string) {
        const url = 'api/User/VarifyBankPassword?bankPassword=' + bankPassW;
        const param = { bankPassword: bankPassW };
        return this.http.post(url, param);
    }
    /**
     * @params 获取密保问及答案
     * @param author David 2019-11-11
     */
    getMiBaoQuestion(name) {
        const apiUrl = 'api/Log/forgetPwdck';
        return this.http.post(apiUrl, name);
    }

    /**
     * @params 修改资金密码
     * @param author David 2019-11-11
     */
    updateBankPwd(bankpwd) {
        const apiUrl = 'api/User/Funds';
        return this.http.post(apiUrl, bankpwd);
    }
    /**
     * @params 获取提现信息
     * @param author David 2019-11-11
     */
    getWithdrawSetting() {
        const apiUrl = 'api/Index/GetWithdrawSetting';
        return this.http.get(apiUrl);
    }
}
