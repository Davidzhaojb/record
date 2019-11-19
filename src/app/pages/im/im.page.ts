import { Component, OnInit, Injector } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';
import { ImService } from 'src/services/im.service';

@Component({
    selector: 'app-im',
    templateUrl: './im.page.html',
    styleUrls: ['./im.page.scss'],
})
export class ImPage extends AppBasePage implements OnInit {
    /**
     * @params 上级用户名
     */
    public parentUserName: string;
    /**
     * @params 当前用户的用户名
     */
    public currentuser: string;
    /**
     * @params 所有消息内容
     */
    public allMessage: any;
    /**
     * @params 是否有新消息
     */
    public noNewMsg: boolean;
    /**
     * @params 传给子组件的值
     */
    public msg: string;
    /**
     * @params 所有未读消息总数
     */
    public sumMessage: number;
    constructor(
        injector: Injector,
        private imservice: ImService,
    ) {
        super(injector);
        this.sumMessage = 0;
        this.msg = '暂无最新消息 ~';
        this.noNewMsg = true;
        this.parentUserName = this.imservice.getParentUserName();
        this.currentuser = this.imservice.getCurrentuserName();
    }

    ngOnInit() {
        this.getSubUsersOrMessage();
        this.getUnreadMessageList();
    }
    ionViewDidEnter() {
        ImService.getMessageList = setInterval(() => {
            this.getSubUsersOrMessage();
            this.getUnreadMessageList();
        }, 5000);
    }
    ionViewDidLeave() {
        clearInterval(ImService.getMessageList);
    }
    /**
     * @params 获取当前用户相关的所有消息以及未读消息
     * @param author David 2019-11-1
     */
    getSubUsersOrMessage() {
        const params = {
            searchUserName: ''
        };
        this.imservice.getSubUsersOrMessage(params).subscribe(s => {
            if (s.Value && s.Value.length > 0) {
                // 将显示的表情路径更改为  [动画表情]
                s.Value.forEach(e => {
                    // tslint:disable-next-line: max-line-length
                    e.Message = e.Message.replace(/<img (width="20px" height ="20px"){0,1} src=\"https:\/\/hot.viba8.com\/jquery-emoji\/img\/emoji\/[0-9]{0,}.png\" class=\"emjio-icon\">/gi, '[动画表情]');
                    // tslint:disable-next-line: max-line-length
                    e.Message = e.Message.replace(/<img (width="20px" height="20px"){0,1} src=\"https:\/\/hot.viba8.com\/jquery-emoji\/img\/emoji\/[0-9]{0,}.png\" class=\"emjio-icon\">/gi, '[动画表情]');

                });
                this.allMessage = s.Value;
                this.noNewMsg = false;
            } else {
                this.noNewMsg = true;
            }
        });
    }
    /**
     * @params 获取未读消息条数
     * @param author David 2019-11-1
     */
    getUnreadMessageList() {
        this.imservice.getUnreadMessage().subscribe(s => {
            if (s.Value.length !== 0) {
                this.sumMessage = 0;
                s.Value.forEach(e => {
                    this.sumMessage += e.NumCount;
                    e.ChatMessageMoel.CreateTime = this.imservice.moment(e.ChatMessageMoel.CreateTime);
                });
            } else {
                this.sumMessage = 0;
            }
        });
    }
    /**
     * @params 进入聊天详情页面
     * @param author David 2019-11-1
     */
    enterChatDetails(chat) {
        this.routerService.goRouterNav('/chat-details', { UserName: chat.UserName });
    }
    /**
     * @params 进入好友列表页面
     * @param author David 2019-11-1
     */
    enterFriendList() {
        this.routerService.goRouterNav('/friend-list');
    }
}
