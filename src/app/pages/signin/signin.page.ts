import { Component, OnInit, Injector } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { AppBasePage } from 'src/shared/app-base-page';
import { zip } from 'rxjs';
@Component({
    selector: 'app-signin',
    templateUrl: './signin.page.html',
    styleUrls: ['./signin.page.scss']
})
export class SigninPage extends AppBasePage implements OnInit {
    //#region
    /**
     * @params 监听捕获异常发送过来的code
     */
    public errCode: string;
    /**
     * @params 是否显示验证码
     */
    public isShowCaptcha = false;
    /**
     * @params 是否显示谷歌验证
     */
    public isShowGoogle = false;
    /**
     * @params captchaId
     */
    public captchaId: string;
    /**
     * @params 验证码图片地址
     */
    public captchaSrc: string;
    /**
     * @params 客服地址
     */
    public customerUrl: string;
    /**
     * @params 登录信息
     */
    public form = {
        username: 'evantest',
        password: 'a123456',
        captcha: '',
        googleKey: '',
        captchaId: this.captchaId
    };
    /**
     * @params 是否显示密码
     */
    public isShowPwd = false;
    //#endregion

    constructor(
        injector: Injector,
        private loginservice: LoginService,
    ) {
        super(injector);
    }

    ngOnInit() {
    }
    /**
     * @params 登录
     * @param author David 2019-10-22
     */
    login() {
       this.routerService.goRouterNav('/tabs/home');
    }

    /**
     * @params 回车登录，适用pc打开
     * @param author David 2019-10-22
     */
    keyDown(e) {
        if (e.keyCode === 13) {
            this.login();
        }
    }
    /**
     * @params 显示/隐藏 登录框密码铭文
     * @param author David 2019-10-26
     */
    showPwd() {
        this.isShowPwd = !this.isShowPwd;
    }
}
