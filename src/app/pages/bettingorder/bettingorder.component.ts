import { Component, OnInit, Injector, SimpleChanges } from '@angular/core';
import { GameSelectComponent } from './game-select/game-select.component';
import { PopoverController, ModalController } from '@ionic/angular';
import { LotteryModel, LotteryPlayDetailModel, LotteryPlayMode } from 'src/models/lottery.model';
import { AppBasePage } from 'src/shared/app-base-page';
import { Router, ActivatedRoute } from '@angular/router';
import { LotteryService } from 'src/services/lottery.service';
import { MoreMenuComponent } from './more-menu/more-menu.component';

@Component({
    selector: 'app-bettingorder',
    templateUrl: './bettingorder.component.html',
    styleUrls: ['./bettingorder.component.scss']
})
export class BettingorderComponent extends AppBasePage implements OnInit {
    isShowLotteryChoose: boolean;
    /** 当前彩种 */
    currentLottery: LotteryModel;
    /** 当前彩种玩法明细 */
    currentLotteryPlayDetails;
    /** 记忆玩法集合 */
    brickCachedModel;
    /** 当前彩种玩法 */
    selectedPlayModeDetail: LotteryPlayDetailModel;
    /** 官方玩法列表 */
    officialPlayModes: LotteryPlayMode[];
    /** 信用玩法列表 */
    creditPlayModes: LotteryPlayMode[];
    /** 官方玩法列表明细 */
    officialPlayModelDetails;
    /** 默认彩种玩法 */
    selectedPlayMode;
    constructor(
        injector: Injector,
        public modalCtrl: ModalController,
        private popoverCtrl: PopoverController,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private lotteryService: LotteryService
    ) {
        super(injector);
        this.isShowLotteryChoose = false;
        this.myObserver.openDistributeIm.subscribe(res => {
            console.log('++++++++++++++', res);
        });
        // this.getLotteryPlays();
        this.selectedPlayModeDetail = new LotteryPlayDetailModel();
        this.currentLottery = history.state.data;
        this.brickCachedModel = this.storageService.read('cachedPlay' + this.currentLottery.LotteryCode);
        if (this.currentLottery.LotteryCode === '95000' || this.currentLottery.LotteryCode === '90002') {
            this.storageService.write('playModeType', 1);
        } else {
            this.storageService.write('playModeType', 0);
        }
    }
    ngOnInit() {
        console.log(history.state.data);
        this.currentLottery = history.state.data;
        // this.activatedRoute.data.subscribe((data) => {
        //     this.currentLottery = data;
        //     console.log(data);
        // });

        this.getLotteryPlays();
    }
    btnChooseLottery() {
        this.isShowLotteryChoose = !this.isShowLotteryChoose;
    }
    /**
     * 彩种切换
     */
    childCheckedLottery(event: LotteryModel) {
        console.log('dianji l ', event);
        this.currentLottery = event;
        console.log('信用还是官方', this.storageService.read('playModeType'));
        this.btnChooseLottery();
    }

    /**
     * 彩种玩法选择
     */
    async showPlayDetail() {
        const params = {
            currentLotteryPlayDetails: this.currentLotteryPlayDetails,
            lotteryCode: this.currentLottery.LotteryCode,
            selectedPlayModeDetail: this.selectedPlayModeDetail
        };
        const modal = await this.modalCtrl.create({ component: GameSelectComponent, componentProps: params });
        await modal.present();
        const { data } = await modal.onWillDismiss();
        console.log(data);
        this.brickCachedModel = data.brickCachedModel;
        this.selectedPlayModeDetail = data.selectedPlayModeDetail;
    }
    /**
     * 获取指定彩种编码玩法数据
     */
    getLotteryPlays() {

        this.lotteryService.getLotteryPlays(this.currentLottery.LotteryCode).subscribe(res => {
            console.log(res);
            this.currentLotteryPlayDetails = res;

            this.officialPlayModes = this.currentLotteryPlayDetails.PlayModes.filter((playMode: LotteryPlayMode) => {
                return playMode.PlayModeType === 0;
            });
            this.selectedPlayMode = this.officialPlayModes.filter((item: LotteryPlayMode) => {
                return item.IsSelect === true;
            });
            this.officialPlayModelDetails = this.selectedPlayMode[0].PlayDetails;
            if (!this.selectedPlayModeDetail.LotteryPlayDetailCode) {
                this.selectedPlayModeDetail = this.officialPlayModelDetails[0];
            }
            this.creditPlayModes = this.currentLotteryPlayDetails.PlayModes.filter((playMode: LotteryPlayMode) => {
                return playMode.PlayModeType === 1;
            });
        });
    }

    /**
     * 点击其余地方关闭彩种选择
     */
    disLotteryChoose() {
        console.log(this.isShowLotteryChoose);
        this.isShowLotteryChoose = false;
    }

    /**
     * 更多菜单
     */
    async moreMenu(ev) {
        const params = {
            selectedPlayModeDetail: this.selectedPlayModeDetail
        };
        const popover = await this.popoverCtrl.create(
            { component: MoreMenuComponent, componentProps: params, cssClass: 'more-menu', event: ev }
        );
        await popover.present();
    }
    /**
     * 记忆玩法点击
     */
    memoryClick(memoryModule) {
        console.log(memoryModule);
        this.selectedPlayModeDetail = memoryModule.PlayDetail;
    }
}
