import { Component, OnInit, Injector } from '@angular/core';
import { ImService } from 'src/services/im.service';
import { AppBasePage } from 'src/shared/app-base-page';

@Component({
    selector: 'app-message-group',
    templateUrl: './message-group.page.html',
    styleUrls: ['./message-group.page.scss'],
})
export class MessageGroupPage extends AppBasePage implements OnInit {
    /**
     * @params 选择的群发对象总人数
     */
    public userNum: number;
    /**
     * @params 绑定的输入框的值
     */
    public inputval: string;
    /**
     * @params 所有下级
     */
    public subUser: [];
    /**
     * @params 已选择的用户数组
     */
    public selectChecked: [];
    constructor(
        injector: Injector,
        private imservice: ImService
    ) {
        super(injector);
        this.inputval = '';
    }

    ngOnInit() {
        this.userNum = 0;
        this.getUpUserOrSubUsers();
    }
    /**
     * @params 搜索功能
     * @param author David 2019-11-5
     */
    getUpUserOrSubUsers() {
        this.imservice.getUpUserOrSubUsers({ searchUserName: this.inputval }).subscribe(s => {
            this.subUser = [];
            if (s && s.Value.length > 0) {
                this.subUser = s.Value;
                this.subUser.forEach((e: any) => {
                    e.checked = false;
                });
                if (this.selectChecked) {
                    this.selectChecked.forEach((e: any) => {
                        this.subUser.forEach((v: any) => {
                            if (e.UserName === v.UserName) {
                                v.checked = e.checked;
                            }
                        });
                    });
                }
            }
        });
    }
    checkuser() {
        const sumUser = [];
        this.subUser.forEach((element: any) => {
            if (element.checked) {
                sumUser.push(this.subUser);
            }
        });
        this.selectChecked = this.subUser;
        this.userNum = sumUser.length;
    }
    allChecked() {
        // 先判断是否有未选中的
        let isAllChcheck = 0;
        isAllChcheck = this.subUser.find((v: any) => {
            return v.checked === false;
        });
        if (!isAllChcheck) {
            this.subUser.forEach((element: any) => {
                element.checked = false;

            });
            this.userNum = 0;
        } else {
            this.subUser.forEach((element: any) => {
                element.checked = true;
            });
            this.userNum = this.subUser.length;
        }
        this.selectChecked = this.subUser;
    }
    /**
     * @params 下一步
     * @param author David 2019-11-5
     */
    next() {
        // const newarray = this.subUser;
        const newArray = [];
        if (this.userNum === 0) {
            this.alertService.presentAlert('收信人不能为空，请重新选择!');
        } else {
            this.subUser.forEach((e: any) => {
                if (e.checked) {
                    newArray.push(e);
                }
                this.userNum = newArray.length;
            });
            this.selectChecked = [];
            const param = {
                selectUser: newArray,
                userNum: this.userNum,
            };
            this.storageService.write('param', param);
            this.routerService.goRouterNav('/chat-details');

        }
    }
}
