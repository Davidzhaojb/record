import { Component, Injector, OnInit } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';
import { LotteryService } from 'src/services/lottery.service';
@Component({
    selector: 'app-trend',
    templateUrl: 'trend.page.html',
    styleUrls: ['trend.page.scss']
})
export class TrendPage extends AppBasePage implements OnInit {
    //#region
    openlatest: any;      // 各彩种最新的开奖号码
    allLotterys: any;     // 从本地存储获得的所有彩种
    brick: any;           // 传递到走势详情页面的数据
    //#endregion
    constructor(
        injector: Injector,
        private lotteryservice: LotteryService
    ) {
        super(injector);
        this.allLotterys = this.storageService.read('lotterys');
    }
    ngOnInit() {
        this.getLotteryOpenLatest();
    }
    /**
     * @params 获取各彩种的最新开奖号码
     * @param author David 2019-10-29
     */
    async getLotteryOpenLatest() {
        await this.loadingService.presentLoader();
        this.lotteryservice.getLotteryOpenLatest().subscribe(res => {
            this.loadingService.loaderDismiss();
            if (res) {
                this.openlatest = res;
                this.openlatest.forEach(element => {
                    element.BgColorNo = Math.floor(Math.random() * 10 + 1);
                    element.openlistLegnth = element.LotteryOpenNo.split(',').length;
                });
            }
        });
    }
    /**
     * @params 进入走势详情页面
     * @param author David 2019-10-29
     */
    enterOpenList(o) {
        if (o === null) {
            this.toastService.loginerror('获取彩种信息错误！');
            return;
        }
        this.brick = this.allLotterys.find(item => {
            return o.LotteryCode === item.LotteryCode;
        });
        this.brick = JSON.stringify(this.brick);
        this.routerService.goRouterNav('/trend-detail', { queryParams: this.brick });
    }
}
