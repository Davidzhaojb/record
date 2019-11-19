import { Router } from '@angular/router';
import { Component, Injector, OnInit } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';
import { LotteryService } from 'src/services/lottery.service';
import { LotteryModel } from 'src/models/lottery.model';
import { AppConsts } from 'src/shared/app-consts';
import { SystemconfigService } from 'src/services/system-config.service';
import { MyobserverService } from 'src/providers/myobserve.service';
import { ImService } from 'src/services/im.service';
import { from } from 'rxjs';
import { Events } from '@ionic/angular';
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})

export class HomePage extends AppBasePage {
    //#region

    /**
     * @params 换肤主题
     */
    public skinArr: any;
    /**
     * @params vr玩法
     */
    public vrModel: any;
    /**
     * @params 首页菜单
     */
    public homeMenu: any;
    /**
     * @params 第三方游戏
     */
    public thirdGameList: any;
    /**
     * @params vr游戏列表
     */
    public vrGameList: any;
    /**
     * @params 首页banner
     */
    public bannerArr = [];
    /**
     * @params 所有玩法明细
     */
    public allLotterys: any;
    /**
     * @params 热门彩种
     */
    public hotLotterys: any;
    /**
     * @params 客服地址
     */
    public customerUrl: string;
    /**
     * @params 所有彩种
     */
    public lotterys: LotteryModel;
    /**
     * @params 我的彩种配置
     */
    public slideOpts = {
        slidesPerView: 3,
        initialSlide: 1,
        speed: 400,
    };
    /**
     * @params 我的彩种
     */
    public myLotterys: [];
    /**
     * @params 未读消息
     */
    public unreadMessage: number;
    /**
     * @params 是否显示未读消息的小红点
     */
    public isShowUnreadMessage: boolean;

    //#endregion
    constructor(
        injector: Injector,
        private sysconfig: SystemconfigService,
        private lotteryservice: LotteryService,
        private myobser: MyobserverService,
        private router: Router,
        private imservice: ImService,
        private events: Events
    ) {
        super(injector);
        this.skinArr = AppConsts.skinArr;
        this.vrModel = AppConsts.vrModel;
        this.homeMenu = AppConsts.homeMenu;
        this.thirdGameList = AppConsts.thirdGameList;
        this.vrGameList = AppConsts.vrGameList;
        this.customerUrl = this.storageService.readString('customerUrl');
        this.isShowUnreadMessage = false;
        this.unreadMessage = 0;
    }

    ionViewDidEnter() {
        this.getLotterysAll();
        this.getBanner();
        this.getUnreadMessage();
    }
    /**
     * @params 获取全部彩种信息
     * @param author David 2019-10-25
     */
    async getLotterysAll() {
        const storageAllLotterys = this.storageService.read('lotterys');
        const storageHotLottery = this.storageService.read('hotLotterys');

        if (!storageAllLotterys || !storageHotLottery) {
            await this.loadingService.presentLoader();
            this.lotteryservice.getLotterys().subscribe(res => {
                this.storageService.write('lotterys', res);
                console.log('res', res);
                this.loadingService.loaderDismiss();
                if (res) {
                    const Recommend: LotteryModel[] = [];
                    res.forEach(item => {
                        if (item.IsRecommend === true) {
                            Recommend.push(item);
                        }
                    });
                    // tslint:disable-next-line: arrow-return-shorthand
                    Recommend.sort((a, b) => {
                        return a.RecommendSerials - b.RecommendSerials;
                    });
                    console.log('Recommend', Recommend);
                    this.hotLotterys = Recommend.slice(0, 6);
                    this.storageService.write('hotLotterys', this.hotLotterys);
                    // this.getLotterysModel(res);
                    // this.allLotterys = this.getLotterysModel(res);
                    // 获取我的彩种
                    // const mylotterys: any = this.storageService.read('mylotterys') || [];
                    // this.myLotterys = mylotterys.length === 0 ? this.storageService.read<[any]>('lotterys') : mylotterys;
                    // this.storageService.write('mylotterys', this.myLotterys);
                    this.myLotterys = res;
                }
            });
        } else {
            this.allLotterys = this.storageService.read('lotterys');
            this.hotLotterys = this.storageService.read('hotLotterys');
            const mylotterys: any = this.storageService.read('mylotterys') || [];
            this.myLotterys = mylotterys.length === 0 ? this.storageService.read<[any]>('lotterys') : mylotterys;
            this.storageService.write('mylotterys', this.myLotterys);

        }
    }
    /**
     * @params 获取首页banner
     * @param author David 2019-10-25
     */
    getBanner() {
        this.sysconfig.getMobileCarousel().subscribe(res => {
            if (res) {
                this.bannerArr = res.reverse();
            }
        });
    }
    /**
     * @params 筛选我的彩种
     * @param author David 2019-10-30
     */
    enterMyLotterys() {
        this.routerService.goRouterNav('/lottery-select');
    }
    /**
     * @params 进入活动页面
     * @param author David 2019-10-26
     */
    toActivity() { }
    /**
     * @params 进入客服聊天
     * @param author David 2019-10-26
     */
    customer() {
        window.open(this.customerUrl, '_black');
    }

    /** 获取所有彩种并分类 */
    public getLotterysModel(allLottery) {
        const data = allLottery;
        if (data == null) {
            return null;
        }
        const formatData = {};
        const lotterys = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.length; i++) {
            const LotteryType = 'LotteryType';
            const LotteryTypeName = 'LotteryTypeName';
            // const plays = 'plays';
            let item = formatData[data[i][LotteryType]];
            if (!item) {
                item = formatData[data[i][LotteryType]] = {
                    code: data[i][LotteryType],
                    name: data[i][LotteryTypeName],
                    plays: []
                };
                lotterys.push(item);
            }
            item[`plays`].push(data[i]);
        }
        this.storageService.write('lotterys', lotterys);
        return lotterys;
    }
    /**
     * @params 热门彩种-更多
     * @param author David 2019-10-29
     */
    showMore() {
        this.routerService.goRouterNav('/home-hotlottery');
    }
    /**
     * @params 切换主题
     * @param author David 2019-10-30
     */
    toggleAppTheme(color, skin) {
        this.myobser.setActiveTheme(color);
        this.storageService.writeString('COLOR', color);
    }

    /**
     * 进入投注页面
     */
    goLotteryPage(lotteryInfo: LotteryModel) {
        this.router.navigate(['/bettingorder'], { state: { data: lotteryInfo } });
    }

    /**
     * @params 获取未读消息总数
     * @param author David 2019-11-5
     */
    getUnreadMessage() {
        this.imservice.getUnreadMessageCount().subscribe(s => {
            const totalMsg = this.storageService.read('totalMessage');
            if (totalMsg >= 0 && s.Value !== 0) {
                this.unreadMessage = s.Value;
                this.isShowUnreadMessage = true;
                // 比较上一次的未读消息数，如果大于上一次，表示有新消息，则弹窗提醒
                if (totalMsg !== s.Value) {
                    let isShowNewMsg = this.storageService.read('newmsg');
                    if (isShowNewMsg == null) {
                        isShowNewMsg = AppConsts.isShowNewMsg;
                        if (isShowNewMsg) {
                            this.toastService.success(`您有${s.Value}条未读消息~`, '', 'top');
                        }
                    }
                    this.storageService.write('totalMessage', s.Value);
                    // this.totalMessage = s.Value;
                    this.isShowUnreadMessage = true;
                    this.unreadMessage = s.Value;
                }
            } else {
                this.storageService.write('totalMessage', s.Value);
                this.unreadMessage = s.Value;
                if (this.unreadMessage > 0) {
                    this.isShowUnreadMessage = true;
                } else {
                    this.isShowUnreadMessage = false;
                }
            }
            this.events.publish('unreadMessage', this.unreadMessage);
        });
    }
}
