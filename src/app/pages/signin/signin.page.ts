import { Component, OnInit, Injector } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { SystemconfigService } from 'src/services/system-config.service';
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
        private sysconfig: SystemconfigService
    ) {
        super(injector);
    }

    ngOnInit() {
       
    }
    /**
     * @params 登录
     * @param author David 2019-10-22
     */
    async login() {
        const loginParams = {
            username: this.form.username,
            password: this.form.password,
            captcha: this.form.captcha,
            captchaId: this.form.captchaId,
            gasecret: this.form.googleKey,
            grant_type: 'password',
            client_id: 'legend'
        };
        // await this.loadingService.presentLoader();
        this.loginservice.login(loginParams).subscribe(
            res => {
                // this.loadingService.loaderDismiss();
                if (res) {
                    this.storageService.writeString('token', res.access_token);
                    this.storageService.writeString(
                        'password',
                        this.form.password
                    );
                    this.getSysConfigAnd();
                }
            },
            err => {
                switch (err.error.error) {
                    case '3':
                        // 显示谷验证器
                        break;
                    case '4':
                        // 登录器验证码错误
                        break;
                    case '5':
                        // 验证码错误
                        this.toastService.loginerror('验证码错误');
                        // this.loadingService.loaderDismiss();
                        break;
                    case '96':
                        // 验证码不能为空
                        this.toastService.loginerror('验证码不能为空');
                        // this.loadingService.loaderDismiss();
                        this.isShowCaptcha = true;
                        break;
                }
            }
        );
    }

    /**
     * @params 获取平台用户信息及系统配置信息
     * @param author Evan 2019-10-26
     */
    async getSysConfigAnd() {
        // await this.loadingService.presentLoader();
        // tslint:disable-next-line: deprecation
        zip(
            this.loginservice.getUserModel().pipe(),
            this.sysconfig.getSysconfig().pipe(),
            (user, system) => {
                this.loadingService.loaderDismiss();
                this.storageService.write('User', user);
                this.storageService.write('sysconfig', system);
            }
        ).subscribe(
            res => {
                // this.loadingService.loaderDismiss();
                this.routerService.goRouterNav('/protocol');
            },
            err => {
                this.loadingService.loaderDismiss();
            }
        );
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
