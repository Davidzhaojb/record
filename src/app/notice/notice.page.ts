import { Component, Injector } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';
import { SystemconfigService } from 'src/services/system-config.service';
@Component({
    selector: 'app-notice',
    templateUrl: 'notice.page.html',
    styleUrls: ['notice.page.scss']
})
export class NoticePage extends AppBasePage {
    /**
     * @params 公告列表
     */
    public articles: any;
    constructor(
        injector: Injector,
        private sysconfig: SystemconfigService,
    ) {
        super(injector);
    }
    ionViewDidEnter() {
        this.getAnnounce();
    }
    /**
     * @params 获取公告列表
     * @param author David 2019-10-26
     */
    async getAnnounce() {
        await this.loadingService.presentLoader();
        this.sysconfig.getAnnounces().subscribe(res => {
            this.loadingService.loaderDismiss();
            const apiurl = 'http://10.0.1.242:8002';
            // 匹配公告表情包
            if (res) {
                res.forEach(e => {
                    e.Summary = e.Summary.replace(/\/Images\/emojis/ig, apiurl + '\/Images\/emojis');
                    // tslint:disable-next-line: quotemark
                    e.Summary = e.Summary.replace(/<img/ig, "<img style='width:20%;height:20%;'");
                });
                this.articles = res;
            }
        });
    }
    /**
     * @params 进入公告详情页面
     * @param author David 2019-10-28
     */
    enterDetail(value) {
        this.routerService.goRouterNav('/notice-detail', { detail: value });
    }
}
