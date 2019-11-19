import { Component, OnInit, Injector } from '@angular/core';
import { BrickModel } from 'src/models/lotteryopen.model';
import { ActivatedRoute } from '@angular/router';
import { AppBasePage } from 'src/shared/app-base-page';
import { LotteryService } from 'src/services/lottery.service';
import { TrendService } from './../../../services/trend.service';
import { AppConsts } from 'src/shared/app-consts';

@Component({
    selector: 'app-trend-detail',
    templateUrl: './trend-detail.page.html',
    styleUrls: ['./trend-detail.page.scss'],
})
export class TrendDetailPage extends AppBasePage implements OnInit{
    /**
     * @params 上个页面传递过来的参数
     */
    public brick: BrickModel;
    /**
     * @params 默认标题
     */
    public defaultTitle: any;
    /**
     * @params 控制标题是否显示
     */
    public isShowNumber = 1;
    /**
     * @params 彩种code
     */
    public lotteryCode = '';
    /**
     * @params 彩种名称
     */
    public lotteryName = '';
    /**
     * @params 是否显示龙虎
     */
    public isShowLH = '';
    /**
     * @params 当前页面
     */
    public currPage = 1;
    /**
     * @params 开奖号码数组
     */
    public openList: any;
    /**
     * @params 是否显示箭头
     */
    public isShowDropDown = true;
    /**
     * @params 是否显示头部的彩种选择栏
     */
    public isShowLotteryChoose = false;
    /**
     * @params 最新期号
     */
    public lastIssueNo = '';
    /**
     * @params 最新开奖号码
     */
    public lastOpenNo = '';
    titleNoLongHu: any[];
    titleSix: any[];
    title: any[];
    constructor(
        injector: Injector,
        private activeRoute: ActivatedRoute,
        private lotteryServive: LotteryService,
        private trendservice: TrendService,
    ) {
        super(injector);
        this.titleNoLongHu = AppConsts.titleNoLongHu;
        this.titleSix = AppConsts.titleSix;
        this.title = AppConsts.title;
        this.openList = [];
        this.activeRoute.queryParams.subscribe(params => {
            if (params) {
                this.brick = JSON.parse(params.queryParams);
                this.lotteryCode = this.brick.LotteryCode;
                this.lotteryName = this.brick.LotteryName;
            }
        });
    }

    ngOnInit() {
        this.showTab(this.lotteryCode, this.lotteryName);
        this.getLotteryOpen(this.lotteryCode);
    }
    /**
     * @params 根据code，判断显示哪个tab
     * @param author David 2019-09-19
     */
    showTab(lotterycode, lotteryname) {
        if (lotterycode !== '95000' && (lotteryname.indexOf('3') >= 0 || lotteryname === '上海时时乐' || lotteryname.indexOf('蛋蛋') >= 0)) {
            this.defaultTitle = this.titleNoLongHu;
        } else if (this.lotteryCode === '95000') {
            this.defaultTitle = this.titleSix;
        } else {
            this.defaultTitle = this.title;
        }
    }
    /**
     * @params 下拉加载
     * @param author David 2019-10-04
     */
    doRefresh(refresher) {
        this.getLotteryOpen(this.lotteryCode);
        refresher.complete();
        const time = setTimeout(() => {
            this.countLongHu();
            this.countFiveNumber();
            this.elevenFive();
            clearTimeout(time);
        }, 1000);
    }
    /**
     * @params 箭头显隐
     * @param author David 2019-09-19
     */
    btnChooseLottery() {
        this.isShowDropDown = (!this.isShowDropDown) ? true : false;
        this.isShowLotteryChoose = !this.isShowLotteryChoose;
    }
    childCheckedLottery(childlottery) {
        this.btnChooseLottery();
        if (childlottery != null) {
            this.isShowLotteryChoose = false;
            if (childlottery.LotteryCode !== this.brick.LotteryCode) {
                this.brick = childlottery;
            }
        }
        this.lotteryCode = childlottery.LotteryCode;
        this.lotteryName = childlottery.LotteryName;
        this.ngOnInit();
        this.typeChoose(1);
    }
    /**
     * @params 点击关闭彩种选择
     * @param author David 2019-09-19
     */
    disLotteryChoose() {
        this.isShowDropDown = (!this.isShowDropDown) ? true : false;
        this.isShowLotteryChoose = false;
    }
    /**
     * @params 处理六合彩 ，pc蛋蛋的东西
     * @param author David 2019-10-04
     */
    setMarksixIssueOpenNo() {
        this.trendservice.setMarksixIssueOpenNo(this.lotteryCode, this.openList);
    }
    /**
     * @params 获取六合彩号码对应的生肖和颜色并返回一个数组
     * @param author David 2019-10-04
     */
    getNumberInfoArr(isLastYear: boolean = false) {
        this.trendservice.getNumberInfoArr();
    }
    /**
     * @params 根据传入的年份获取对应的生肖信息
     * @author David 2019-09-19
     * @param {number} year
     * @returns
     * @memberof BettingOrderHelper
     */
    getZodiacAndPoultryByYean(year: number) {
        this.trendservice.getZodiacAndPoultryByYean(year);
    }
    /**
     * @params 六合彩号码对应的色波和生肖
     * @param author David 2019-09-19
     */
    getLetteryMarkSixColor(num) {
        this.trendservice.getLetteryMarkSixColor(num);
    }
    /**
     * @description: 头部菜单切换控制不同类型号码显隐
     * @param {type} 2019-1-17 david
     */
    typeChoose(v: number) {
        switch (v) {
            case 5:
                this.countFiveNumber();
                this.isShowNumber = 5;
                break;
            case 2:
                this.elevenFive();
                this.isShowNumber = 2;
                break;
            case 3:
                this.elevenFive();
                this.isShowNumber = 3;
                break;
            case 4:
                this.elevenFive();
                this.countLongHu();
                this.countFiveNumber();
                this.isShowNumber = 4;
                break;
            default:
                this.isShowNumber = 1;
        }
    }

    /**
     * @params 获取彩种的开奖号码
     * @param author David 2019-09-19
     */
    getLotteryOpen(lotteryCode: string, pageIndex: number = 1, pageSize: number = 30) {
        return this.lotteryServive.getLotteryOpen(lotteryCode, pageIndex, pageSize)
            .subscribe(res => {
                if (pageIndex === 1) {
                    this.openList = [];
                    this.openList = res;
                } else {
                    this.openList = this.openList.concat(res);
                }
                if (this.openList.length > 0) {
                    this.lastIssueNo = this.openList[0].IssueNo;
                    this.lastOpenNo = this.openList[0].LotteryOpenNo;
                    this.setMarksixIssueOpenNo();
                }
            }
            );
    }
    /**
     * @params PK10，时时彩，11选5龙虎计算
     * @param author David 2019-1-19
     */
    countLongHu() {
        this.trendservice.countLongHu(this.openList);
    }
    /**
     * @description: 计算所有号码大小,单双
     * @param {type} 2019-1-19 david
     */
    elevenFive() {
        this.openList = this.trendservice.elevenFive(this.openList);
    }
    /**
     * @description: 计算所有开奖号码总和，计算冠亚和,冠亚大小，冠亚单双，总和大小，总和单双
     * @param author 2019-1-17 david
     */
    countFiveNumber() {
        this.openList = this.trendservice.countFiveNumber(this.openList);
    }
    /**
     * @params 六合彩获取号码对应生肖
     * @param author David 2019-09-19
     */
    getSxByNum(num: number, IssueNo?: string) {
        this.trendservice.getSxByNum(num, IssueNo);
    }
}
