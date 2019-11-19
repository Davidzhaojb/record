import { Component, OnInit, Injector } from '@angular/core';
import { SystemconfigService } from 'src/services/system-config.service';
import { AppBasePage } from 'src/shared/app-base-page';
import { LotteryModel } from 'src/models/lottery.model';

@Component({
    selector: 'app-home-hotlottery',
    templateUrl: './home-hotlottery.page.html',
    styleUrls: ['./home-hotlottery.page.scss'],
})
export class HomeHotlotteryPage extends AppBasePage implements OnInit {
    /**
     * @params 彩种编号code
     */
    public tempLotteryGroupCodes: any[];
    /**
     * @params 处理后的彩种数组
     */
    public newLotterys = [];
    /**
     * @params 所有彩种数组
     */
    public lotterys: any[];
    /**
     * @params 设置默认显示值
     */
    public val = '全部';
    /**
     * @params 是否显示玩法分类
     */
    public isShowDifLottery = false;
    /**
     * @params 玩法分类
     */
    public difLottery: LotteryModel[] = [];

    constructor(
        injector: Injector,
        private sysconfig: SystemconfigService
    ) {
        super(injector);
        this.lotterys = this.storageService.read('lotterys');
        this.tempLotteryGroupCodes = ['01', '02', '08', '07', '10', '03', '11'];
        this.tempLotteryGroupCodes.forEach(code => {
            const lottery = this.sysconfig.getLotterysModel().find(s => {
                return code === s.code;
            });
            // tslint:disable-next-line: curly
            if (lottery) {
                this.newLotterys.push(lottery);

            }
        });

    }

    ngOnInit() {
    }
    /**
     * @params 传入彩种大类名称，返回大类玩法
     * @param author David 2019-10-28
     */
    getDifLottery(lotteryName: string) {
        if (lotteryName === '全部') {
            return;
        }
        let newLottery;
        this.newLotterys.forEach(s => {
            if (lotteryName === s.name) {
                newLottery = s;
            }
        });
        return newLottery;
    }
    /**
     * @params 选择玩法
     * @param author David 2019-10-28
     */
    select(val) {
        this.val = val;
        if (val === '全部') {
            this.isShowDifLottery = false;
        } else {
            this.difLottery = this.getDifLottery(val).plays;
            this.isShowDifLottery = true;
        }
    }
}
