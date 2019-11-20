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
    public email: string;
    public password: string;
    /**
     * @params 登录信息
     */
    public params = {
        userEmail: this.email,
        pwd: this.password,
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
        this.params.userEmail = this.email;
        this.params.pwd = this.password;
        this.loginservice.Login(this.params).subscribe(s => {
            if (s) {
                if (s.code === 1) {
                    this.toastService.success('登录成功', '', 'middle');
                    this.storageService.write('Token', s.data.token);
                    this.routerService.goRouterNav('/tabs/home');
                } else {
                    this.toastService.success(s.msg, '', 'middle');
                }
            }
        });
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
