import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable()
export class RouterService {
    constructor(
        private router: Router,
        private nav: NavController,
    ) { }

    /**
     * 路由跳转
     * @param nav 路由路径
     * @param params  参数
     */
    goRouterNav(nav: string, params?: any) {
        this.router.navigate([nav], { queryParams: params });
    }

    /**
     * @params 回退
     * @param author David 2019-10-26
     */
    goBack() {
        this.nav.pop();
    }
    /**
     * @params 退出
     * @param author David 2019-10-26
     */
    logOut() {
        localStorage.clear();
        this.router.navigate(['/signin']);
    }
}
