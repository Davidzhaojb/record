import { Component, OnInit, Injector } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';
import { UserService } from 'src/services/user.service';
import { AppConsts } from '../../shared/app-consts';
import { UserModel } from 'src/models/user.model';
@Component({
    selector: 'app-personal',
    templateUrl: './personal.page.html',
    styleUrls: ['./personal.page.scss']
})
export class PersonalPage extends AppBasePage implements OnInit {
    //#region
    /**
     * @params 头部菜单列表(充值，提现，转账)
     */
    finance: any[];
    /**
     * @params 菜单列表
     */
    menuList: any[];
    /**
     * @params 图片的服务器请求地址
     */
    imgurl: string;
    /**
     * @params 用户余额
     */
    userMoney: any;
    /**
     * @params 个人基本信息
     */
    userInformation: UserModel;
    //#endregion
    constructor(
        injector: Injector,
        private user: UserService
    ) {
        super(injector);
        this.userInformation = this.storageService.read('User');
        this.finance = AppConsts.finance;
        this.menuList = AppConsts.menuList;
    }

    ngOnInit() {
        this.getUserMoney();
    }
    /**
     * @params 获取用户余额
     * @param author David 2019-10-26
     */
    getUserMoney() {
        this.user.getUserMoney().subscribe(res => {
            this.userMoney = res;
        });
    }
    /**
     * @params 跳转详情页
     * @param author David 2019-11-9
     */
    enterDetailPage(router) {
        this.routerService.goRouterNav('/router');
    }
    /**
     * @params 充值
     * @param author David 2019-11-5
     */
    recharge() {
        console.log('充值页面');
    }
    /**
     * @params 提现
     * @param author David 2019-11-5
     */
    withdraw() {
        this.routerService.goRouterNav('/withdraw');
    }
    /**
     * @params 退出
     * @param author David 2019-10-26
     */
    exit() {
        this.routerService.logOut();
    }
}
