import { Component, OnInit, Injector } from '@angular/core';
import { RegisterService } from '../../../services/registered.service';
import { AppBasePage } from 'src/shared/app-base-page';
@Component({
    selector: 'app-registered',
    templateUrl: './registered.page.html',
    styleUrls: ['./registered.page.scss'],
})
export class RegisteredPage extends AppBasePage implements OnInit {
    /* 用户名 */
    public username: any;
    /* 密码 */
    public password: any;
    /* 确认密码 */
    public passwordtwo: any;
    /* email */
    public email: any;
    // 注册参数
    public params: any;
    constructor(
        injector: Injector,
        private registerservice: RegisterService
    ) {
        super(injector);
        this.params = {
            userName: this.username,
            userEmail: this.email,
            pwdGroup: {
                pwd: this.password,
                rePwd: this.passwordtwo
            }
        };
    }

    ngOnInit() {
    }
    /**
     * @params 注册
     * @param author David 2019-11-20
     */
    register() {
        this.params.userName = this.username;
        this.params.userEmail = this.email;
        this.params.pwdGroup.pwd = this.password;
        this.params.pwdGroup.rePwd = this.passwordtwo;
        this.registerservice.register(this.params).subscribe(s => {
            if (s) {
                if (s.code === 1) {
                    this.toastService.success(s.msg, '', 'middle');
                    this.routerService.goRouterNav('/signin');
                } else {
                    this.toastService.error(s.msg, '', 'middle');
                }
            }
        });
    }
}
