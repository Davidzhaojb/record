import { Injectable, Injector } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';
import { UserModel } from 'src/models/user.model';
import { HttpClientService } from 'src/providers/http-client.service';
import * as moment from 'moment';
import { Observable, observable, of } from 'rxjs';

@Injectable()
export class ImService extends AppBasePage {
    constructor(
        injector: Injector,
        private http: HttpClientService,
    ) {
        super(injector);
    }
    /**
     * @params 消息列表页面消息轮询
     */
    public static getMessageList: any;
    /**
     * @params 聊天页面获取消息轮询
     */
    public static getHistoryList: any;
    /**
     * @params 首页获取总消息条数轮询
     */
    public static getMessageCount: any;

    /**
     * @params 获取上级用户名
     * @param author David 2019-10-31
     */
    public getParentUserName() {
        return this.storageService.read<UserModel>('User').ParentUserName;
    }
    /**
     * @params 获取当前用户的用户名
     * @param author David 2019-11-1
     */
    public getCurrentuserName() {
        return this.storageService.read<UserModel>('User').UserName;
    }
    /**
     * @params 格式化时间
     * @param author David 2019-11-1
     */
    public moment(time) {
        const newTime = moment(time, moment.ISO_8601).format('YYYY-MM-DD HH:mm:ss');
        return newTime;
    }
    /**
     * @params 获取上级用户
     * @param author David 2019-11-1
     */
    getUpUser() {
        const reqUrl = 'api/Chat/GetUpUser';
        return this.http.get(reqUrl);
    }
    /**
     * @params 获取下级用户
     * @param author David 2019-11-1
     */
    getSubUsers() {
        const reqUrl = 'api/Chat/GetSubUsers';
        return this.http.get(reqUrl);

    }

    /**
     * @params 获取聊天记录
     * @param author David 2019-11-1
     */
    getChatMessage(param) {
        const reqUrl = 'api/Chat/GetChatMessage';
        return this.http.get(reqUrl, param);
    }
    /**
     * @params 获取未读消息
     * @param author David 2019-11-1
     */
    getUnreadMessageCount() {
        const reqUrl = 'api/Chat/GetChatNewMessageCountByUser';
        return this.http.get(reqUrl);
    }
    /**
     * @params 发送消息
     * @param author David 2019-11-1
     */
    sendMessage(param) {
        const reqUrl = 'api/Chat/AddChatMessage';
        return this.http.post(reqUrl, param);
    }
    /**
     * @params 获取未读消息列表
     * @param author David 2019-11-1
     */
    getUnreadMessage() {
        const reqUrl = 'api/Chat/GetChatNewMessageCountListByUser';
        return this.http.get(reqUrl);
    }
    /**
     * @params 获取新消息以及下拉获取历史记录
     * @param author David 2019-11-1
     */
    getNewHistoryMsg(param) {
        const reqUrl = 'api/Chat/GetNewOrOldChatMessages';
        return this.http.get(reqUrl, param);
    }
    /**
     * @params 标记消息为已读
     * @param author David 2019-11-1
     */
    setChatMessageIsRead(param) {
        const reqUrl = 'api/Chat/SetChatMessageIsRead/' + param;
        return this.http.post(reqUrl, param);
    }
    /**
     * @params 获取黑名单设置
     * @param author David 2019-11-1
     */
    GetChatUserBannedAsync() {
        const reqUrl = 'api/Chat/GetChatUserBannedAsync';
        return this.http.get(reqUrl);
    }
    /**
     * @params 获取聊天开关
     * @param author David 2019-11-1
     */
    getChatSetting() {
        const reqUrl = 'api/Chat/GetChatSetting';
        return this.http.get(reqUrl);
    }


    /**
     * @params 获取上下级所有用户 (联系人列表)
     * @param author David 2019-11-1
     */
    getUpUserOrSubUsers(param) {
        const reqUrl = 'api/Chat/GetUpUserOrSubUsers';
        return this.http.get(reqUrl, param);
    }

    /**
     * @params 获取下级用户包含下级用户的最新消息数量，和最新消息体
     * @param author David 2019-11-1
     */
    getSubUsersOrMessage(param) {
        const reqUrl = 'api/Chat/GetSubUsersOrMessage';
        return this.http.get(reqUrl, param);
    }
}

