import { Component, OnInit, Injector } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';
import { BaseSearchComponent } from 'src/app/base-search/base-search.component';
import { AppConsts } from 'src/shared/app-consts';
import { UserModel } from 'src/models/user.model';
import { WithDrawService } from 'src/services/withdraw.service';
import * as moment from 'moment';
@Component({
    selector: 'app-widthdraw-record',
    templateUrl: './widthdraw-record.page.html',
    styleUrls: ['./widthdraw-record.page.scss'],
})
export class WidthdrawRecordPage extends AppBasePage implements OnInit {
    public msg;
    /**
     * @params 查询报表的起始日期
     */
    public start: any;
    /**
     * @params 查询报表的结束日期
     */
    public end: any;
    /**
     * @params 报表查询参数
     */
    public site: any;
    /**
     * @params 接受返回的报表数据
     */
    public depRecords: any;
    /**
     * @params 判断是否有未显示的数据，用来判断是否加载下拉加载组件
     */
    public hasMore: boolean;
    /**
     * @params 用来判断是否有数据返回
     */
    public isHave: boolean;
    /**
     * @params 是否显示提现详情页面
     */
    public isShowWithDetail: boolean;
    /**
     * @params 提现记录用到的数据
     */
    public withDrawItem: any;
    constructor(
        injector: Injector,
        private appconsts: AppConsts,
        private withdrawservice: WithDrawService
    ) {
        super(injector);
        this.msg = '目前没有数据，在右上角改变一下条件试试 ~';
        this.start = this.appconsts.startNowDate();
        this.end = this.appconsts.endDate();
        // tslint:disable-next-line: no-use-before-declare
        this.site = new WithdrawSearchInput();
        this.site.UserName = this.storageService.read<UserModel>('User').UserName;
        this.site.StartDate = this.appconsts.startNowDate();
        this.site.EndDate = moment(this.appconsts.endDate()).add(1, 'd').format('YYYY-MM-DD');
        this.site.PageIndex = this.appconsts.PageIndex();
        this.site.PageSize = this.appconsts.PageSize();
        this.isShowWithDetail = false;
    }

    ngOnInit() {
        this.record(this.site);

    }
    /**
     * @params 获取子组件的值
     * @param author David 2019-11-15
     */
    getFilter(e) {
        if (e === 2) {
            this.filter();
        }
    }
    /**
     * @params 筛选
     * @param author David 2019-11-12
     */
    filter() {
        const date = {
            startDate: this.start,
            endDate: this.end
        };
        this.popoverService.presentPopover(BaseSearchComponent, { props: date }).then(s => {
            if (s) {
                this.site.StartDate = s.startDate;
                this.site.EndDate = s.endDate;
                this.record(this.site);
            }
        });
    }
    /**
     * @params 查询报表
     * @param author David 2019-11-12
     */
    async record(obj: WithdrawSearchInput) {
        await this.loadingService.presentLoader();
        return this.withdrawservice.getWithdrawRecord(obj.UserName, obj.StartDate, obj.EndDate, obj.PageSize,
            obj.PageIndex).subscribe(s => {
                this.loadingService.loaderDismiss();
                if (s.List != null) {
                    if (obj.PageIndex === 1) {
                        this.depRecords = [];
                        this.depRecords = s.List;
                        if (s.List.length < s.PageCount) {
                            this.hasMore = true;
                        } else {
                            this.hasMore = false;
                        }
                    } else {
                        this.depRecords = this.depRecords.concat(s.List);
                        if (this.depRecords.length < s.PageCount) {
                            this.hasMore = true;
                        } else {
                            obj.PageIndex = 1;
                            this.hasMore = false;
                        }
                    }
                } else {
                    this.depRecords = [];
                }
                this.depRecords.forEach(t => {
                    t.AddTime = moment(t.AddTime, moment.ISO_8601).format('YYYY-MM-DD HH:mm:ss');
                });
                if (this.depRecords.length < 1) {
                    this.isHave = false;
                } else {
                    this.isHave = true;
                }
            });

    }
    /**
     * @params 展示提现详情页面。使用组件方式展示。利用字父组件传值
     * @param author David 2019-11-12
     */
    enterMain(value) {
        this.withDrawItem = value;
        this.isShowWithDetail = true;
    }
    /**
     * @params 下拉加载
     * @param author David 2019-11-13
     */
    doRefresh(event) {
        this.site.PageIndex++;
        this.record(this.site);
        setTimeout(() => {
            event.target.complete();
            this.toastService.success('加载成功!', '', 'middle');
        }, 2000);
    }
    /**
     * @params 关闭提现记录详情
     * @param author David 2019-11-12
     */
    close() {
        this.isShowWithDetail = false;
    }
}
export class WithdrawSearchInput {
    UserName: string;
    StartDate: string;
    EndDate: string;
    PageIndex: number;
    PageSize: number;
}
