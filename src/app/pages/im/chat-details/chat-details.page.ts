import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    EmojiListModel, EmojiGroupModel, EmojiEntity,
    GetMessageModel, GetNewMessageModel, ShowMessageList, SendMessageModel
} from 'src/models/emoji.model';
import { ImService } from 'src/services/im.service';
import { AppBasePage } from 'src/shared/app-base-page';
import { IonContent } from '@ionic/angular';
import * as $ from 'jquery';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
    selector: 'app-chat-details',
    templateUrl: './chat-details.page.html',
    styleUrls: ['./chat-details.page.scss'],
})
export class ChatDetailsPage extends AppBasePage implements OnInit {
    @ViewChild(IonContent, { static: true }) content: IonContent;
    //#region
    /**
     * @params 表情列表model
     */
    public emojiListModel: EmojiListModel;
    /**
     * @params 表情组model
     */
    public emojiGroup: EmojiGroupModel;
    /**
     * @params 表情组集合
     */
    public emojiGroups: EmojiGroupModel[];
    /**
     * @params 聊天对象
     */
    public chatUser: string;
    /**
     * @params 聊天对象数组
     */
    public chatUserArr = [];
    /**
     * @params 上级用户名
     */
    public parentUserName: string;
    /**
     * @params 显示群发还是显示姓名
     */
    public isShowName: boolean;
    /**
     * @params 聊天框输入的内容
     */
    public chatContent: any;
    /**
     * @params 区分单聊跟群发
     */
    public showPlaceholder: boolean;
    /**
     * @params 当前登录的用户
     */
    public currUser: string;
    /**
     * @params 存储聊天记录内容
     */
    public messages: Array<any> = [];
    /**
     * @params 群发选中的联系人列表
     */
    public manyUser;
    /**
     * @params 发送信息间隔
     */
    public intervalTime: number;
    /**
     * @params 用作发送消息的计时器
     */
    public clInterval: any;
    /**
     * @params 是否显示表情包列表
     */
    public isShowEmojiList: boolean;
    /**
     * @params 是否被禁言
     */
    public noSpeak: boolean;
    /**
     * @params 发送消息的表单数组
     */
    public messageForm: any;
    /**
     * @params 是否显示聊天框
     */
    public isShowManyUser: boolean;
    //#endregion

    constructor(
        injector: Injector,
        private activerouter: ActivatedRoute,
        private imservice: ImService,
        private formBuilder: FormBuilder,

    ) {
        super(injector);
        //#region
        this.chatContent = '';
        this.intervalTime = 3;
        this.isShowEmojiList = false;
        this.noSpeak = false;
        this.isShowManyUser = false;
        this.isShowName = false;
        this.emojiListModel = new EmojiListModel();
        this.emojiGroups = [];
        this.showPlaceholder = true;
        //#endregion
        this.manyUser = this.storageService.read('param');
        if (this.storageService.read('param')) {
            this.isShowManyUser = true;
        }
        /**
         * @params 从im传过来的数据
         */
        this.activerouter.queryParams.subscribe(res => {
            if (res.UserName) {
                this.chatUser = res.UserName;
            }
        });
        this.messageForm = formBuilder.group({
            message: new FormControl('')
        });
        document.addEventListener('input', (event) => {
            if (document.getElementById('message-box')) {
                if (document.getElementById('message-box').innerHTML.length > 0) {
                    this.showPlaceholder = false;
                } else {
                    this.showPlaceholder = true;
                }
            }
        });
    }
    /**
     * @params 获取上级用户名，获取当前用户的用户名，添加输入框监听事件
     * @param author David 2019-11-1
     */
    ngOnInit() {
        /**
         * @params 监听输入框的内容
         */
        this.parentUserName = this.imservice.getParentUserName();
        this.currUser = this.imservice.getCurrentuserName();

    }
    ionViewDidEnter() {
        const emojiGaoQing = new EmojiGroupModel();
        emojiGaoQing.groupName = 'emoji高清';
        emojiGaoQing.path = 'https://hot.viba8.com/jquery-emoji/img/emoji/';
        emojiGaoQing.maxLength = 84;
        emojiGaoQing.postfix = '.png';
        emojiGaoQing.placeholder = ':qq_{emoji}:';
        this.emojiListModel.emojiList.push(emojiGaoQing);
        this.initEmoji(this.emojiListModel);
        this.getChatMessage();
    }
    ionViewDidLeave() {
        this.storageService.remove('param');
    }
    /**
     * @params 表情包初始化
     * @param author David 2019-11-1
     */
    initEmoji(options?: EmojiListModel) {
        if (options) {
            if (options.emojiList && options.emojiList.length === 0) {
                this.alertService.presentAlert('表情包配置异常！');
                return;
            }
            for (let i = 0; i < options.emojiList.length; i++) {
                const path = options.emojiList[i].path;
                const maxLength = options.emojiList[i].maxLength;
                const emojiExtend = [];
                if (!path || !maxLength) {
                    alert('第' + i + '个表情组配置异常！');
                    continue;
                }
                for (let j = 1; j <= maxLength; j++) {
                    const emoji = new EmojiEntity();
                    emoji.id = j;
                    emoji.isShow = true;
                    emoji.name = '';
                    emoji.title = '';
                    emojiExtend.push(emoji);
                }
                options.emojiList[i].emojiExtend = emojiExtend;
            }
        }
    }
    /**
     * @params 输入框获取焦点
     * @param author David 2019-11-4
     */
    focusEvent() {
        document.getElementById('message-box').focus();
    }
    /**
     * @params 发送消息
     * @param 这里为了简单只判断 单聊(-1) 自由选中(3)，发所有人跟所有下级都调用type=3的接口
     * @param 因为不管是所有人还是自由选择，只调用一次接口。
     * @param type type=1 是所有人  2 是所有下级  3自由选中（要传用户名) -1是单聊
     * @param author David 2019-11-1
     */
    send(type?) {
        // this.manyUser !== undefined 表明是从群发过来的， 这里将this.chatUser，type重新赋值
        if (!this.chatUser) {
            this.chatUserArr = [];
            this.chatUser = '';
            this.manyUser.selectUser.forEach((element: any) => {
                this.chatUserArr.push(element.UserName);
                // 给发送消息的对象重新赋值,  ToUserName 为字符串，需要将数组转换为字符串
                this.chatUser = this.chatUserArr.join(',');
            });
            type = 3;
        } else {
            type = -1;
        }
        const message = $('.message-box').html();
        if (message.replace(/<img.*?(?:>|\/>)/gi, '').length >= 50) {
            this.alertService.presentAlert('信息发送限制为每句50字以内，谢谢！');
            return;
        }

        // 设置发送信息间隔为3秒钟
        if (this.intervalTime > 0 && this.intervalTime < 3) {
            this.alertService.presentAlert('信息发送限制为3秒1次，谢谢！');
            return;
        } else {
            this.clInterval = setInterval(() => {
                this.intervalTime--;
                if (this.intervalTime === 0) {
                    clearInterval(this.clInterval);
                    this.intervalTime = 3;
                }
            }, 1000);
        }
        this.hideEmojiList();
        this.getImToker();
        const str = message.replace(/(^\s*)|(\s*$)/g, '');
        if (str === '' || str === undefined || str === null) {
            this.alertService.presentAlert('不能发送空白消息!');
            return;
        }
        if (message && message !== '') {
            const sendMessage: SendMessageModel = {
                ToUserName: this.chatUser,
                Message: message,
                Type: type
            };
            // 发送消息
            this.imservice.sendMessage(sendMessage).subscribe(res => {
                if (res.Value) {
                    if (type !== -1) {
                        const msg = {
                            text: message,
                            sendTime: new Date().toLocaleString()
                        };
                        this.messages.push(msg);
                    }
                    document.getElementById('message-box').innerHTML = '';
                    this.showPlaceholder = true;
                } else {
                    this.alertService.presentAlert(res.Value);
                }
            }, err => { });
            // this.chatBox = '';
            // 发送完消息立即调取接口获取最新消息(群发就不需要调了)
            if (type === -1) {
                setTimeout(() => {
                    this.getNewHistoryMsg();
                }, 700);
            }
            this.scrollToBottom();
        }
    }
    /**
     * @params 表情点击响应事件
     * @param emojiGroup 点击的表情组
     * @param emoji 点击对应的表情
     * @param author David 2019-11-1
     */
    emojiClick(emojiGroup: EmojiGroupModel, emoji: EmojiEntity) {
        const emojiImg = document.createElement('img');
        emojiImg.setAttribute('src', emojiGroup.path + '' + emoji.id + '' + emojiGroup.postfix);
        emojiImg.setAttribute('class', 'emjio-icon');
        $('.message-box').html($('.message-box').html() + emojiImg.outerHTML);
        if (document.getElementById('message-box').innerHTML) {
            this.showPlaceholder = false;
        } else {
            this.showPlaceholder = true;
        }
    }
    /**
     * @params 获取聊天记录，只用来第一次获取
     * @param author David 2019-11-1
     */
    getChatMessage() {
        if (this.storageService.read('param')) {
            return;
        }
        this.messages = [];
        const params: GetMessageModel = {
            toUserName: this.chatUser,
            pageSize: 20,
            pageIndex: 1,
        };
        // this.imservice.getFirstHistoryMessage(params, this.perUser, this.messages);
        this.imservice.getChatMessage(params).subscribe(s => {
            if (s) {
                const maxID = s.Value[0].Id;
                const minID = s.Value.reverse()[0].Id;
                this.storageService.write('maxId', maxID);
                this.storageService.write('minId', minID);
                s.Value.forEach(e => {
                    // 当消息状态为未读且被发送人是当前用户的时候，将消息标记为已读
                    if (!e.IsRead && (e.ToUserName === this.currUser)) {
                        this.imservice.setChatMessageIsRead(e.Id).subscribe(res => {
                        });
                    }
                    e.CreateTime = this.imservice.moment(e.CreateTime);
                    const historyMessage = {
                        toUserName: e.ToUserName,
                        sendTime: e.CreateTime,
                        text: e.Message,
                    };
                    this.messages.push(historyMessage);
                });
            }
            this.scrollToBottom();
            this.getNewHistoryMsg();
            ImService.getHistoryList = setInterval(() => {
                this.getNewHistoryMsg();
            }, 10000);
        });
    }
    /**
     * @params 隐藏表情包列表
     * @param author David 2019-11-1
     */
    hideEmojiList() {
        if (this.isShowEmojiList) {
            this.isShowEmojiList = !this.isShowEmojiList;
        }
    }
    /**
     * @params 点击空白隐藏表情框
     * @param author David 2019-11-4
     */
    onMessageHold() {
        this.hideEmojiList();
    }
    /**
     * @params 显示表情包
     * @param author David 2019-11-4
     */
    showEmojiList() {
        this.scrollToBottom();
        this.isShowEmojiList = !this.isShowEmojiList;
    }
    /**
     * @params 获取黑名单配置
     * @param author David 2019-11-1
     */
    getImToker() {
        this.imservice.GetChatUserBannedAsync().subscribe(s => {
            this.noSpeak = s.Value.IsBanned || s.Value.IsBlacklist;
            if (s.Value.IsBlacklist) {
                this.alertService.presentAlert('您已被禁言，请联系客服');
                this.routerService.goRouterNav('/home');
            }
        });
    }
    /**
     * @params 获取最新的历史消息
     * @param author David 2019-11-1
     */
    getNewHistoryMsg() {
        const readmaxId = this.storageService.read('maxId');
        if (readmaxId) {
            const param: GetNewMessageModel = {
                toUserName: this.chatUser,
                maxId: readmaxId,
                pageSize: 20,
                isNewMessage: true
            };
            this.imservice.getNewHistoryMsg(param).subscribe(
                s => {
                    if (s.Value.length > 0) {
                        const maxID = s.Value[0].Id;
                        this.storageService.write('maxId', maxID);
                        s.Value.reverse().forEach(e => {
                            // this.imservice.setMessageIsRead(e, this.currUser);
                            if (!e.IsRead && (e.ToUserName === this.currUser)) {
                                this.imservice.setChatMessageIsRead(e.Id).subscribe(res => {
                                });
                            }

                            const newMessage: ShowMessageList = {
                                toUserName: e.ToUserName,
                                sendTime: this.imservice.moment(e.CreateTime),
                                text: e.Message,
                            };
                            // 删除id=0的插入的消息
                            this.messages.forEach((s, i) => {
                                if (s.id === 0) {
                                    this.messages.splice(i, 1);
                                }
                            });
                            this.messages.push(newMessage);
                            this.scrollToBottom();
                        });
                    }
                }
            );
        }
    }
    /**
     * @params 下拉加载
     * @param author David 2019-11-5
     */
    doRefresh(event) {
        const minId = this.storageService.read('minId');
        const param = {
            toUserName: this.chatUser,
            maxId: minId,
            pageSize: 20,
            isNewMessage: false
        }
        this.imservice.getNewHistoryMsg(param).subscribe(s => {
            // 如何长度为零，标识已经没有最新消息
            if (s.Value.length === 0) {
                this.alertService.presentAlert('已无更多消息...');
                event.target.complete();
                return;
            }
            const minID = s.Value.reverse()[0].Id;
            this.storageService.write('minId', minID);
            s.Value.forEach(e => {
                // this.imservice.setMessageIsRead(e, this.currUser);
                if (!e.IsRead && (e.ToUserName === this.currUser)) {
                    this.imservice.setChatMessageIsRead(e.Id).subscribe(res => {
                    });
                }
                const historyMessage = {
                    toUserName: e.ToUserName,
                    sendTime: this.imservice.moment(e.CreateTime),
                    text: e.Message,
                };
                setTimeout(() => {
                    event.target.complete();
                    // 要在关闭loading的时候加载消息，下拉立即加载，体验不好
                    this.messages.unshift(historyMessage);
                }, 2000);
            });
        });
    }
    /**
     * @params 滚动到顶部
     * @param author David 2019-11-1
     */
    scrollToBottom() {
        setTimeout(() => {
            this.content.scrollToBottom();
        }, 200);
    }
}
