import { Component, Injector } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppBasePage } from 'src/shared/app-base-page';
import { MyobserverService } from 'src/providers/myobserve.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent extends AppBasePage {
    /**
     * @params 默认主题样式
     */
    public selectedTheme: string;
    /**
     * @params 选中状态
     */
    public check;
    constructor(
        injector: Injector,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private myobser: MyobserverService
    ) {
        super(injector);
        const color = this.storageService.readString('COLOR');
        if (!color) {
            // 换肤颜色设置默认值
            this.selectedTheme = '';
        } else {
            setTimeout(() => {
                this.selectedTheme = color;
            }, 500);
        }
        this.initializeApp();
        this.myobser.getActiveTheme().subscribe(val => {
            this.selectedTheme = val;
            this.check = !this.check;
        });
    }
    initializeApp() {
        this.platform
            .ready()
            .then(() => {
                this.statusBar.styleDefault();
                this.splashScreen.hide();
            })
            .then(() => {
                if (this.storageService.readString('Token')) {
                    this.routerService.goRouterNav('/tabs/home');
                } else {
                    // 未登录，跳转到登录页面
                    // this.routerService.goRouterNav('/signin');
                    this.routerService.goRouterNav('/signin');
                }
            });
    }

    /** 获取打包线路API */
    initDefaultApi() { }
}
