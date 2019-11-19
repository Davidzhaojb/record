import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AppBasePage } from 'src/shared/app-base-page';

@Component({
    selector: 'app-notice-detail',
    templateUrl: './notice-detail.page.html',
    styleUrls: ['./notice-detail.page.scss'],
})
export class NoticeDetailPage extends AppBasePage implements OnInit {
    /**
     * @params 获取公告详情
     */
    public noticeDetail: any;
    /**
     * @params 没有公告时显示的内容
     */
    public noMsg: boolean;
    constructor(
        injector: Injector,
        private activedRouter: ActivatedRoute,
        private sanitizer: DomSanitizer,
    ) {
        super(injector);
        this.noMsg = true;
    }

    ngOnInit() {
        this.getNoticeDetail();
    }
    /**
     * @params 获取公告详情
     * @param author David 2019-10-28
     */
    async getNoticeDetail() {
        await this.loadingService.presentLoader();
        this.activedRouter.queryParams.subscribe(detail => {
            this.loadingService.loaderDismiss();
            if (detail) {
                this.noticeDetail = this.sanitizer.bypassSecurityTrustHtml(detail.detail);
                this.noMsg = false;
            } else {
                this.noMsg = true;
            }
        });
    }
}
