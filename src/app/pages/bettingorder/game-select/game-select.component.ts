import { Component, OnInit, Injector } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LotteryPlayMode, LotteryPlayDetailModel } from 'src/models/lottery.model';
import { CachedModel, StorageLottery } from 'src/models/brick.model';
import { AppBasePage } from 'src/shared/app-base-page';
@Component({
    selector: 'game-select',
    templateUrl: './game-select.component.html',
    styleUrls: ['./game-select.component.scss']
})
export class GameSelectComponent extends AppBasePage implements OnInit {
    currentLotteryPlayDetails;

    /** 官方玩法列表 */
    officialPlayModes: LotteryPlayMode[];

    /** 信用玩法列表 */
    creditPlayModes: LotteryPlayMode;

    /** 默认进入信用还是官方 */
    defaultPlayModeType;

    /** 官方玩法列表明细 */
    officialPlayModelDetails;

    /** 默认彩种玩法 */
    selectedPlayMode;

    /** 默认彩种玩法明细 */
    selectedPlayModeDetail;

    currentPlay;
    /** 记忆玩法 */
    brickCachedModel: CachedModel[];
    brickCached: CachedModel;
    currModel: StorageLottery;
    cacheIndex: number;
    /** 当前彩种编码 */
    lotteryCode;
    constructor(
        injector: Injector,
        private modalCtrl: ModalController,
        private navParams: NavParams,
    ) {
        super(injector);
        this.currentLotteryPlayDetails = this.navParams.get('currentLotteryPlayDetails');
        this.selectedPlayModeDetail = this.navParams.get('selectedPlayModeDetail');
        console.log(this.selectedPlayModeDetail);
        this.lotteryCode = this.navParams.get('lotteryCode');
        this.brickCachedModel = this.storageService.read('cachedPlay' + this.lotteryCode);
        this.brickCachedModel = this.brickCachedModel ? this.brickCachedModel : [];
        console.log(this.brickCachedModel);
        // if (cacheBrickItem) {
        //   this.brickCachedModel.
        // }
        console.log(this.currentLotteryPlayDetails, this.brickCachedModel);
        this.defaultLotteryPlay();
    }

    ngOnInit() {
        this.initLotteryModel();
    }
    /**
     * 官方信用玩法分类
     */
    initLotteryModel() {
        this.officialPlayModes = this.currentLotteryPlayDetails.PlayModes.filter((playMode: LotteryPlayMode) => {
            return playMode.PlayModeType === 0;
        });
        this.selectedPlayMode = this.officialPlayModes.filter(res => {
            return res.IsSelect === true;
        });
        this.officialPlayModelDetails = this.selectedPlayMode[0].PlayDetails;
        if (!this.selectedPlayModeDetail.LotteryPlayDetailCode) {
            this.selectedPlayModeDetail = this.officialPlayModelDetails[0];
        }
        this.creditPlayModes = this.currentLotteryPlayDetails.PlayModes.filter((playMode: LotteryPlayMode) => {
            return playMode.PlayModeType === 1;
        });
        this.choosePlayModeType(this.selectedPlayMode[0]);
    }
    /**
     * 默认进入投注页面官方还是信用
     * 0是官方，1是信用
     */
    defaultLotteryPlay() {
        if (this.currentLotteryPlayDetails.LotteryCode === '95000' || this.currentLotteryPlayDetails.LotteryCode === '90002') {
            this.defaultPlayModeType = 1;
        } else {
            this.defaultPlayModeType = 0;
        }
        this.storageService.write('PlayModeType', this.defaultPlayModeType);
    }


    /**
     * 选中游戏玩法
     */
    choosePlayModeType(playMode: LotteryPlayMode) {
        this.currModel = {
            LotteryCode: playMode.LotteryPlayModeCode,
            LotteryName: playMode.LotteryPlayModeName
        };
        this.selectedPlayMode.IsSelect = false;
        playMode.IsSelect = true;
        this.selectedPlayMode = playMode;
        this.officialPlayModelDetails = playMode.PlayDetails;
        console.log(this.officialPlayModelDetails);
    }

    /**
     * 选中游戏玩法小类
     */
    choosePlayModeDetail(playModeDetail) {
        console.log(playModeDetail);
        this.selectedPlayModeDetail = playModeDetail;
        this.brickCached = {
            PlayMode: this.currModel,
            PlayDetail: playModeDetail
        };
        this.cacheIndex = this.brickCachedModel.findIndex(s => s.PlayDetail.LotteryPlayDetailCode === playModeDetail.LotteryPlayDetailCode);
        if (this.cacheIndex < 0) {
            this.brickCachedModel.unshift(this.brickCached);
            if (this.brickCachedModel.length > 3) {
                this.brickCachedModel.pop();
            }
        }
        this.storageService.write('cachedPlay' + this.lotteryCode, this.brickCachedModel);
        this.back();

    }

    /**
     * 返回
     */
    back() {
        this.modalCtrl.dismiss(
            {
                selectedPlayMode: this.selectedPlayMode,
                selectedPlayModeDetail: this.selectedPlayModeDetail,
                brickCachedModel: this.brickCachedModel
            }
        );
    }
}
