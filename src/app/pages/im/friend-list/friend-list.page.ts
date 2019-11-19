import { Component, OnInit } from '@angular/core';
import { ImService } from 'src/services/im.service';
import { AppBasePage } from 'src/shared/app-base-page';
import { Injector } from '@angular/core';

@Component({
    selector: 'app-friend-list',
    templateUrl: './friend-list.page.html',
    styleUrls: ['./friend-list.page.scss']
})
export class FriendListPage extends AppBasePage implements OnInit {
    /**
     * @params 上级用户名
     */
    public upUser: string;
    /**
     * @params 所有下级
     */
    public subUser = [];
    /**
     * @params 好友列表是否显示上级
     */
    public isShowUpUser: boolean;
    /**
     * @params 可以进去聊天界面，但是输入框是禁用的
     */
    public IsBanned: boolean;
    /**
     * @params 黑名单的，聊天界面都不能进去
     */
    public IsBlacklist: boolean;
    constructor(injector: Injector, private imservice: ImService) {
        super(injector);
        this.isShowUpUser = true;
        this.IsBanned = false;
        this.IsBlacklist = false;
    }

    ngOnInit() {
        this.getUpUser();
        this.getSubUsers();
        this.getImToker();
    }
    /**
     * @params 获取黑名单
     * @param author David 2019-11-4
     */
    getImToker() {
        this.imservice.GetChatUserBannedAsync().subscribe(s => {
            this.IsBanned = s.Value.IsBanned;
            this.IsBlacklist = s.Value.IsBlacklist;
        });
    }
    /**
     * @params 获取下级列表
     * @param author David 2019-11-04
     */
    getSubUsers() {
        this.imservice.getSubUsers().subscribe(s => {
            if (s.Value.length > 0) {
                s.Value.forEach(user => {
                    this.subUser.push(user.UserName);
                });
            }
        });
    }
    /**
     * @params 获取上级用户名
     * @param author David 2019-11-04
     */
    getUpUser() {
        if (this.imservice.getParentUserName()) {
            this.upUser = this.imservice.getParentUserName();
            this.isShowUpUser = true;
        } else {
            this.isShowUpUser = false;
        }
    }
    /**
     * @params 进入聊天详情页面，判断是否已被拉入黑名单
     * @param author David 2019-11-04
     */
    chatDetails(getName) {
        if (this.IsBlacklist) {
            this.alertService.presentAlert('您已被禁言，请联系客服!');
            return;
        } else {
            let sendName = getName;
            if (getName === '上级代理') {
                sendName = this.upUser;
            }
            this.routerService.goRouterNav('/chat-details', {
                UserName: sendName
            });
        }
    }
    /**
     * @params 进入群发页面
     * @param author David 2019-11-04
     */
    enterMsgGroup() {
        this.routerService.goRouterNav('/message-group');
    }
}
