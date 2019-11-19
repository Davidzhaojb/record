import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/providers/http-client.service';

@Injectable()
export class ThirdGameService {
    public param: string;
    constructor(private http: HttpClientService) {
        this.param = '';
    }
    //#region ug
    /**
     * @params 登录ug
     * @param author David 2019-11-9
     */
    loginUg(webtype = 'Smart') {
        const reqUrl = 'api/Ug/LoginUg';
        return this.http.get(reqUrl, { webType: webtype });
    }
    /**
     * @params 平台到UG转账
     * @param author David 2019-11-9
     */
    transferToUg(amount, transferType) {
        const requrl = 'api/Ug/TransferToUg';
        const par = { Amount: amount, TransferType: transferType };
        return this.http.post(requrl, par);
    }
    /**
     * @params UG到平台转账
     * @param author David 2019-11-9
     */
    transferFromUg(amount, transferType) {
        const requrl = 'api/Ug/TransferFromUg';
        const par = { Amount: amount, TransferType: transferType };
        return this.http.post(requrl, par);
    }
    /**
     * @params 获取ug余额
     * @param author David 2019-11-9
     */
    getUgBalance() {
        const reqUrl = 'api/Ug/GetUgBalance';
        return this.http.post(reqUrl, this.param);
    }
    //#endregion
    /**
     * _______________#########_______________________
     * ______________############_____________________
     * ______________#############____________________
     * _____________##__###########___________________
     * ____________###__######_#####__________________
     * ____________###_#######___####_________________
     * ___________###__##########_####________________
     * __________####__###########_####_______________
     * ________#####___###########__#####_____________
     * _______######___###_########___#####___________
     * _______#####___###___########___######_________
     * ______######___###__###########___######_______
     * _____######___####_##############__######______
     * ____#######__#####################_#######_____
     * ____#######__##############################____
     * ___#######__######_#################_#######___
     * ___#######__######_######_#########___######___
     * ___#######____##__######___######_____######___
     * ___#######________######____#####_____#####____
     * ____######________#####_____#####_____####_____
     * _____#####________####______#####_____###______
     * ______#####______;###________###______#________
     * ________##_______####________####______________
     */

    //#region ag
    /**
     * @params 进入ag
     * @param author David 2019-11-9
     */
    goAgGame() {
        const reqUrl = 'api/Ag/ForwardGame?gameType=1+&actype=1+&oddtype=A"';
        return this.http.get(reqUrl);
    }
    /**
     * @params 获取ag余额
     * @param author David 2019-11-9
     */
    getAgBalance() {
        const reqUrl = 'api/Ag/GetBalance';
        return this.http.get(reqUrl);
    }
    /**
     * @params ag转账
     * @param author David 2019-11-9
     */
    agTransfer(params) {
        const reqUrl = 'api/Funds/PlatformTransfer';
        return this.http.post(reqUrl, params);
    }
    //#endregion
    /**
     * _______________#########_______________________
     * ______________############_____________________
     * ______________#############____________________
     * _____________##__###########___________________
     * ____________###__######_#####__________________
     * ____________###_#######___####_________________
     * ___________###__##########_####________________
     * __________####__###########_####_______________
     * ________#####___###########__#####_____________
     * _______######___###_########___#####___________
     * _______#####___###___########___######_________
     * ______######___###__###########___######_______
     * _____######___####_##############__######______
     * ____#######__#####################_#######_____
     * ____#######__##############################____
     * ___#######__######_#################_#######___
     * ___#######__######_######_#########___######___
     * ___#######____##__######___######_____######___
     * ___#######________######____#####_____#####____
     * ____######________#####_____#####_____####_____
     * _____#####________####______#####_____###______
     * ______#####______;###________###______#________
     * ________##_______####________####______________
     */

    //#region vr
    /**
     * @params 判断vr是否开启
     * @param author David 2019-11-9
     */
    getVrIsOpen() {
        const reuUrl = 'api/VedioRacing/VRisOpen';
        return this.http.post(reuUrl, this.param);
    }
    /**
     * @params 进入VR
     * @param author David 2019-11-9
     */
    openVr(Id = 0) {
        const reqUrl = 'api/VedioRacing/Logon';
        return this.http.get(reqUrl, { channelId: Id });
    }
    /**
     * @params 获取vr游戏记录
     * @param author David 2019-11-9
     */
    getBetReport(params) {
        const reqUrl = 'api/VedioRacing/GetBetReport';
        return this.http.post(reqUrl, params);
    }
    /**
     * @params vr追号记录
     * @param author David 2019-11-9
     */
    getBetChaseReport(params) {
        const reqUrl = 'api/VedioRacing/GetBetChaseReport';
        return this.http.post(reqUrl, params);
    }
    /**
     * @params vr盈亏记录
     * @param author David 2019-11-9
     */
    getPlayerReport(params) {
        const reqUrl = 'api/VedioRacing/GetPlayerReport';
        return this.http.post(reqUrl, params);
    }
    /**
     * @params vr帐变记录
     * @param author David 2019-11-9
     */
    getAccountChangeReport(params) {
        const reqUrl = 'api/VedioRacing/GetAccountChangeReport';
        return this.http.post(reqUrl, params);
    }
    /**
     * @params 根据追号id获取订单详情列表
     * @param author David 2019-11-9
     */
    getBetReportByChase(params) {
        const reqUrl = 'api/VedioRacing/GetBetReportByChase';
        return this.http.post(reqUrl, params);
    }
    /**
     * @params 获取vr帐变类别
     * @param author David 2019-11-9
     */
    getChangeTypes() {
        const reqUrl = 'api/VedioRacing/GetChangeTypes';
        return this.http.get(reqUrl);
    }
    //#endregion
    /**
     * _______________#########_______________________
     * ______________############_____________________
     * ______________#############____________________
     * _____________##__###########___________________
     * ____________###__######_#####__________________
     * ____________###_#######___####_________________
     * ___________###__##########_####________________
     * __________####__###########_####_______________
     * ________#####___###########__#####_____________
     * _______######___###_########___#####___________
     * _______#####___###___########___######_________
     * ______######___###__###########___######_______
     * _____######___####_##############__######______
     * ____#######__#####################_#######_____
     * ____#######__##############################____
     * ___#######__######_#################_#######___
     * ___#######__######_######_#########___######___
     * ___#######____##__######___######_____######___
     * ___#######________######____#####_____#####____
     * ____######________#####_____#####_____####_____
     * _____#####________####______#####_____###______
     * ______#####______;###________###______#________
     * ________##_______####________####______________
     */
    //#region ebet
    /**
     * @params 进入ebet
     * @param author David 2019-11-9
     */
    loginEbet() {
        const reqUrl = 'api/Ebet/LoginEbet';
        const par = {};
        return this.http.post(reqUrl, par);
    }
    /**
     * @params 判断ebet是否开启
     * @param author David 2019-11-9
     */
    ebetStatus() {
        const reqUrl = 'api/Ebet/EbetisOpen';
        return this.http.post(reqUrl, {});
    }
    /**
     * @params 这个是啥
     * @param author David 2019-11-9
     */
    getTransferStatus() {
        const reqUrl = 'api/Report/GetDictions?CodeType=EbetTran';
        return this.http.get(reqUrl);
    }
    /**
     * @params 获取转账记录
     * @param author David 2019-11-9
     */
    getTransferList(params) {
        const reqUrl = 'api/Ebet/GetTransferList';
        const par = {
            RecordCode: params.RecordCode, StartDate: params.StartDate,
            EndDate: params.EndDate, PageIndex: params.PageIndex, PageSize: params.PageSize, Status: params.Status, Type: params.Type
        };
        return this.http.post(reqUrl, par);
    }
    /**
     * @params 获取游戏记录
     * @param author David 2019-11-9
     */
    getEbetBetList(params) {
        const reqUrl = 'api/Ebet/GetBettingList';
        const par = {
            StartDate: params.StartDate, EndDate: params.EndDate,
            PageIndex: params.PageIndex, PageSize: params.PageSize, BetHistoryId: params.GameId
        };
        return this.http.post(reqUrl, par);
    }
    /**
     * @params 获取ebet余额
     * @param author David 2019-11-9
     */
    getEbetBalance() {
        const reqUrl = 'api/Ebet/GetBalance';
        return this.http.post(reqUrl, {});
    }
    /**
     * @params ebet转账
     * @param canshu 0：向ebet转入，1：从ebet转出
     * @param author David 2019-11-9
     */
    ebetTransfer(amount, flag) {
        const reqUrl = flag === '0' ? 'api/Ebet/TransferToEbet' : 'api/Ebet/TransferFromEbet';
        const par = flag === '0' ? { Money: amount, Type: 0 } : { Money: amount, Type: 1 };
        return this.http.post(reqUrl, par);
    }
    //#endregion
    /**
     * _______________#########_______________________
     * ______________############_____________________
     * ______________#############____________________
     * _____________##__###########___________________
     * ____________###__######_#####__________________
     * ____________###_#######___####_________________
     * ___________###__##########_####________________
     * __________####__###########_####_______________
     * ________#####___###########__#####_____________
     * _______######___###_########___#####___________
     * _______#####___###___########___######_________
     * ______######___###__###########___######_______
     * _____######___####_##############__######______
     * ____#######__#####################_#######_____
     * ____#######__##############################____
     * ___#######__######_#################_#######___
     * ___#######__######_######_#########___######___
     * ___#######____##__######___######_____######___
     * ___#######________######____#####_____#####____
     * ____######________#####_____#####_____####_____
     * _____#####________####______#####_____###______
     * ______#####______;###________###______#________
     * ________##_______####________####______________
     */
    //#region kaiyuan
    /**
     * @params 登录开元棋牌
     * @param author David 2019-11-9
     */
    login(kindId: string = '0') {
        const reqUrl = 'api/KaiYuan/Login';
        return this.http.post(reqUrl, { KindID: kindId });
    }
    /**
     * @params 开元转账 type='2':转账到开元
     * @param author David 2019-11-9
     */
    transferToKaiYuan(money: number) {
        const reqUrl = 'api/KaiYuan/TransferToKaiYuan';
        return this.http.post(reqUrl, { Money: money, Type: '2' });
    }
    /**
     * @params 从开元转出
     * @param author David 2019-11-9
     */
    transferFromKaiYuan(money: number) {
        const reqUrl = 'api/KaiYuan/TransferFromKaiYuan';
        return this.http.post(reqUrl, { Money: money, Type: '3' });
    }
    /**
     * @params 获取开元余额
     * @param author David 2019-11-9
     */
    getKaiYuanBalance() {
        const reqUrl = 'api/KaiYuan/GetBalance';
        return this.http.post(reqUrl, null);
    }
    /**
     * @params 获取开元转账记录
     * @param author David 2019-11-9
     */
    getKaiYuanTransferList(params) {
        const reqUrl = 'api/KaiYuan/GetTransferList';
        return this.http.post(reqUrl, params);
    }
    /**
     * @params 获取开元投注记录
     * @param author David 2019-11-9
     */
    getBettingList(params) {
        const reqUrl = 'api/KaiYuan/GetBettingList';
        return this.http.post(reqUrl, params);
    }
    /**
     * @params 判断开元是否开启
     * @param author David 2019-11-9
     */
    getKaiYuanIsOpen() {
        const reqUrl = 'api/KaiYuan/KaiYuanisOpen';
        return this.http.post(reqUrl, null);
    }
    //#endregion

}
