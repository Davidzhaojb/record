import { Component, OnInit, Output, EventEmitter, Injector, Input } from '@angular/core';
import { LotteryModel, IntegrateLottertAllArr } from 'src/models/lottery.model';
import { AppBasePage } from 'src/shared/app-base-page';

@Component({
    selector: 'lottery-chooes',
    templateUrl: './lottery-chooes.component.html',
    styleUrls: ['./lottery-chooes.component.scss']
})
export class LotteryChooesComponent extends AppBasePage implements OnInit {
    @Output() checkLottery = new EventEmitter<LotteryModel>();
    lotteryTypes;
    currShowLotteries;

    /** 选中彩种 */
    checkLotteryPlay;

    inputLotteryType;
    // @Input() inputLotteryType;
    @Input() currentLottery;
    constructor(injector: Injector, ) { super(injector); }

    ngOnInit() {
        this.lotteryTypes = this.storageService.read<IntegrateLottertAllArr>('lotterys');
        this.inputLotteryType = this.lotteryTypes.find(item => {
            return this.currentLottery.LotteryType === item.code;
        });
        this.checkLotteryPlay = this.inputLotteryType;
        this.currShowLotteries = this.inputLotteryType.plays;
    }
    /**
     * 彩种选择
     *
     */
    changeLotteryType(lotteryType: IntegrateLottertAllArr) {
        this.currShowLotteries = lotteryType.plays;
        this.inputLotteryType = lotteryType;
    }
    /**
     * 玩法选择
     */
    changeLottery(gameType) {
        if (gameType.LotteryCode === '95000' || gameType.LotteryCode === '90002') {
            this.storageService.write('playModeType', 1);
        } else {
            this.storageService.write('playModeType', 0);
        }
        this.checkLottery.emit(gameType);
        this.checkLotteryPlay = gameType;

    }
}
