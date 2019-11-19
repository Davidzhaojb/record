import { Component, OnInit, Input, OnDestroy, Injector, SimpleChanges, OnChanges } from '@angular/core';
import { LotteryService } from 'src/services/lottery.service';
import { IssueModel, LotteryModel } from 'src/models/lottery.model';
import * as moment from 'moment';
import { AppBasePage } from 'src/shared/app-base-page';
@Component({
    selector: 'lottery-number',
    templateUrl: './lottery-number.component.html',
    styleUrls: ['./lottery-number.component.scss']
})
export class LotteryNumberComponent extends AppBasePage implements OnChanges, OnInit, OnDestroy {

    @Input() currentLottery: LotteryModel;

    issueInfo: IssueModel;
    /** 开奖倒计时间 */
    winCountDown;

    numberArr = [0, 0, 0, 0, 0];
    /** 计时器 */
    timer;
    /** 开奖期号 */
    openIssue;
    /** 官方信用Type */
    playModeType: number;
    constructor(
        injector: Injector,
        private lotteryService: LotteryService
    ) {
        super(injector);
        this.issueInfo = new IssueModel();
        this.playModeType = 0;
    }

    ngOnDestroy() {
        clearInterval(this.timer);
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.currentLottery) {
            this.getIssue();
            this.getLotteryOpen();
        }
    }
    ngOnInit() {
        this.getIssue();
        this.getLotteryOpen();
    }
    // ionViewDidLeave() {
    //     console.log('离开页面了');
    //     clearInterval(this.timer);
    // }

    /**
     * 补零
     */
    zeroFill(v) {
        return v < 10 ? '0' + v : v;
    }

    /**
     * 获取期号信息
     */
    getIssue() {
        this.lotteryService.getIssue(this.currentLottery.LotteryCode).subscribe((res: IssueModel) => {
            this.issueInfo = res;
            this.issueCountDown(this.issueInfo.RemainTime);
            // const data = this.zeroFill(tempTime.hours()) + ':' + this.zeroFill(tempTime.minutes())
            //     + ':' + this.zeroFill(tempTime.seconds());
            // console.log(data);
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.issueInfo.RemainTime -= 1000;
                this.issueCountDown(this.issueInfo.RemainTime);
            }, 1000);
        });

    }

    /**
     * 开奖倒计时
     */
    issueCountDown(val) {
        if (val > 0) {
            const tempTime = moment.duration(val);
            this.winCountDown = this.zeroFill(tempTime.hours()) + ':' + this.zeroFill(tempTime.minutes())
                + ':' + this.zeroFill(tempTime.seconds());
        } else {
            // this.alertService.presentAlert()
            this.getIssue();
            this.getLotteryOpen();
        }

    }
    /**
     * 开奖号码
     */
    getLotteryOpen() {
        this.lotteryService.getLotteryOpen(this.currentLottery.LotteryCode, 1, 1).subscribe((res) => {
            this.openIssue = res[0].IssueNo;
            this.numberArr = res[0].LotteryOpenNo.split(',');
        });
    }
    /**
     * 官方信用玩法切换
     */
    switchLotteryType(type) {
        console.log(type);
        // this.storageService.read('PlayModeType');
        this.storageService.read('playModeType') === 1 ? this.playModeType = 0 : this.playModeType = 1;
        this.storageService.write('playModeType', this.playModeType);
    }
}
