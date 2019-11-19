import { Component, OnInit, Injector } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { AppConsts } from 'src/shared/app-consts';
import * as moment from 'moment';
import { AppBasePage } from 'src/shared/app-base-page';

@Component({
    selector: 'app-base-search',
    templateUrl: './base-search.component.html',
    styleUrls: ['./base-search.component.scss'],
})
export class BaseSearchComponent extends AppBasePage implements OnInit {
    /**
     * @params 近几天
     */
    public nearday: any[];
    /**
     * @params 默认起始查询日期
     */
    public start: any;
    /**
     * @params 默认结束查询日期
     */
    public end: any;
    /**
     * @params 获取当前时间
     */
    public time = new Date();
    /**
     * @params 默认选择今天
     */
    public selectNum = 0;
    /**
     * @params 传參用
     */
    public tracks = {};
    /**
     * @params 分页
     */
    public PageIndex = 1;
    /**
     * @params 转账记录账单类型
     */
    public changeTypes: any;
    /**
     * @params 选中的账单类型
     */
    public typeCode: any;
    /**
     * @params 是否显示夏季用户名
     */
    public isShowName: boolean;
    constructor(
        injector: Injector,
        private popoverCtrl: PopoverController,
        private navParams: NavParams,
        private appconsts: AppConsts

    ) {
        super(injector);
        this.start = this.appconsts.startNowDate();
        this.end = this.appconsts.endDate();
        this.nearday = [
            { name: '今天', num: 0 },
            { name: '近三天', num: 3 },
            { name: '近一周', num: 7 },
        ];
        console.log('传过来的值', this.navParams.data.props);
        if (this.navParams.data.props) {
            this.start = this.navParams.data.props.startDate;
            this.end = this.navParams.data.props.endDate;
            this.changeTypes = this.navParams.data.props.changetype;
            this.typeCode = this.navParams.data.props.typeCode;
            this.isShowName = this.navParams.data.props.showName;
            console.log('changeTypes', this.navParams.data.props.changetype);
        }
    }

    ngOnInit() { }
    /**
     * @params 点击今天，昨天，前三天按钮查询条件
     * @param author David 2019-10-02
     */
    checkTime(num) {
        const today = new Date(this.time.getTime());
        if (today.getMonth() > 8) {
            this.end = today.getFullYear() + '-' + (today.getMonth() + 1);
        } else {
            this.end = today.getFullYear() + '-0' + (today.getMonth() + 1);
        }
        if (today.getDate() > 9) {
            this.end += ('-' + today.getDate());
        } else {
            this.end += ('-0' + today.getDate());
        }
        this.nearDay(num);
    }
    /**
     * @params 近几天的记录查询
     * @param author David 2019-10-02
     */
    nearDay(num) {
        this.selectNum = num;
        const before = new Date(this.time.getTime() - num * 24 * 60 * 60 * 1000);
        if (before.getMonth() > 8) {
            this.start = before.getFullYear() + '-' + (before.getMonth() + 1);
        } else {
            this.start = before.getFullYear() + '-0' + (before.getMonth() + 1);
        }
        if (before.getDate() > 9) {
            this.start += ('-' + before.getDate());
        } else {
            this.start += ('-0' + before.getDate());
        }
    }
    /**
     * @params 确定
     * @param author David 2019-10-02
     */
    applyFilters() {
        this.start = moment(this.start, moment.ISO_8601).format('YYYY-MM-DD');
        this.end = moment(this.end, moment.ISO_8601).add(1, 'd').format('YYYY-MM-DD');
        // tslint:disable-next-line: no-string-literal
        this.tracks['startDate'] = this.start;
        // tslint:disable-next-line: no-string-literal
        this.tracks['endDate'] = this.end;
        // tslint:disable-next-line: no-string-literal
        this.tracks['typeCode'] = this.typeCode;
        console.log('返回的tracks', this.tracks);
        this.popoverCtrl.dismiss(this.tracks);
    }
    /**
     * @params 取消
     * @param author David 2019-10-02
     */
    dismiss() {
        this.popoverCtrl.dismiss();
    }
}
