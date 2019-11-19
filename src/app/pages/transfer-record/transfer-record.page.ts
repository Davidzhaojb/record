import { Component, OnInit, Injector } from '@angular/core';
import { AppConsts } from 'src/shared/app-consts';
import { TransferService } from 'src/services/transfer.service';
import * as moment from 'moment';
import { UserModel } from 'src/models/user.model';
import { AppBasePage } from 'src/shared/app-base-page';
import { BaseSearchComponent } from 'src/app/base-search/base-search.component';

@Component({
    selector: 'app-transfer-record',
    templateUrl: './transfer-record.page.html',
    styleUrls: ['./transfer-record.page.scss'],
})
export class TransferRecordPage extends AppBasePage implements OnInit {
    /**
     * @params 提示
     */
    public msg: string;
    /**
     * @params 是否有数据
     */
    public isHave: boolean;
    /**
     * @params 查询开始时间
     */
    public start: any;
    /**
     * @params 查询结束时间
     */
    public end: any;
    /**
     * @params 查询结果
     */
    public records: any;
    /**
     * @params 是否需要加载下拉刷新
     */
    public hasmore: boolean;
    /**
     * @params 个人转账报表查询参数
     */
    public site: AccountSearchInput;
    /**
     * @params 团队转账报表查询参数
     */
    public sites: TeamAccountInput;
    /**
     * @params 所有账单类别
     */
    public changeTypes: any;
    /**
     * @params typeCode
     */
    public typeCode: any;
    /**
     * @params 绑定 segment
     */
    public type: any;
    constructor(
        injector: Injector,
        private appconsts: AppConsts,
        private transferservice: TransferService

    ) {
        super(injector);
        this.msg = '目前没有数据，在右上角改变一下条件试试 ~';
        this.isHave = false;
        this.start = this.appconsts.startNowDate();
        this.end = this.appconsts.endDate();
        this.hasmore = false;
        this.type = 0;
        // tslint:disable-next-line: no-use-before-declare
        this.site = new AccountSearchInput();
        // tslint:disable-next-line: no-use-before-declare
        this.sites = new TeamAccountInput();
        console.log('site', this.site);
        this.site.userName = this.storageService.read<UserModel>('User').UserName;
        // this.site.startDate = this.appconsts.startNowDate();
        this.site.startDate = '2019-01-01';
        this.sites.startDate = '2019-01-01';
        this.site.endDate = moment(this.appconsts.endDate()).add(1, 'd').format('YYYY-MM-DD');
        this.sites.endDate = moment(this.appconsts.endDate()).add(1, 'd').format('YYYY-MM-DD');
        this.typeCode = '_ALL';

    }

    ngOnInit() {
        this.record(this.site);
        this.getTypes();
    }
    /**
     * @params 个人转账报表查询
     * @param author David 2019-11-15
     */
    async record(obj: AccountSearchInput) {
        await this.loadingService.presentLoader();
        return this.transferservice.getChangeRecord(obj).subscribe(s => {
            this.loadingService.loaderDismiss();
            if (obj.pageIndex === 1) {
                this.records = [];
                this.records = s.List;
                if (s.List.length < s.PageCount) {
                    this.hasmore = true;
                } else {
                    this.hasmore = false;
                }
            } else {
                this.records = this.records.concat(s.List);
                if (this.records.length < s.PageCount) {
                    this.hasmore = true;
                } else {
                    obj.pageIndex = 1;
                    this.hasmore = false;
                }
            }
            this.records.forEach(t => {
                t.AddTime = moment(t.AddTime, moment.ISO_8601).format('YYYY-MM-DD HH:mm:ss');
            });
            if (this.records.length < 1) {
                this.isHave = false;
            } else {
                this.isHave = true;
            }
        });
    }

    /**
     * @params 团队帐变记录
     * @param author David 2019-11-16
     */
    async teamarecord(obj: TeamAccountInput) {
        await this.loadingService.presentLoader();
        return this.transferservice.queryTeamChange(obj).subscribe(s => {
            this.loadingService.loaderDismiss();
            if (s.List != null) {
                if (obj.pageIndex === 1) {
                    this.records = [];
                    this.records = s.List;
                    if (s.List.length < s.PageCount) {
                        this.hasmore = true;
                    } else {
                        this.hasmore = false;
                    }
                } else {
                    this.records = this.records.concat(s.List);
                    if (this.records.length < s.PageCount) {
                        this.hasmore = true;
                    } else {
                        obj.pageIndex = 1;
                        this.hasmore = false;
                    }
                }
                this.records.forEach(t => {
                    t.AddTime = moment(t.AddTime, moment.ISO_8601).format('YYYY-MM-DD HH:mm:ss');
                });
                if (this.records.length < 1) {
                    this.isHave = false;
                } else {
                    this.isHave = true;
                }
            } else {
                this.isHave = false;
            }
        });
    }
    /**
     * @params 判断个人还是团队
     * @param author David 2019-11-16
     */
    perTeam() {
        if (this.type === '1') {
            this.teamarecord(this.sites);
        } else {
            this.record(this.site);
        }
    }
    /**
     * @params 获取所有账单类别
     * @param author David 2019-11-15
     */
    getTypes() {
        this.transferservice.getChangeType().subscribe(s => {
            if (s) {
                this.changeTypes = s;
            }
        });
    }
    /**
     * @params 筛选
     * @param author David 2019-11-15
     */
    filter() {
        const date = {
            startDate: this.start,
            endDate: this.end,
            changetype: this.changeTypes,
            typeCode: this.typeCode,
        };
        if (this.type === '1') {
            // tslint:disable-next-line: no-string-literal
            date['showName'] = true;
        }
        this.popoverService.presentPopover(BaseSearchComponent, { props: date }).then(s => {
            if (s) {
                this.site.startDate = s.startDate;
                this.start = s.startDate;
                this.site.endDate = s.endDate;
                this.end = s.endDate;
                this.site.typeCode = s.typeCode;
                this.record(this.site);
            }
        });
    }
    /**
     * @params 下拉加载，上拉刷新
     * @param author David 2019-11-16
     */
    doRefresh(event) {
        // 判断是个人还是团队的刷新
        if (this.type === '0') {
            this.site.pageIndex++;
            this.record(this.site);
        } else {
            this.sites.pageIndex++;
            this.teamarecord(this.sites);
        }
        setTimeout(() => {
            event.target.complete();
            this.toastService.success('加载成功!', '', 'middle');
        }, 1000);
    }
}


export class AccountSearchInput {
    constructor() {
        this.startDate = null;
        this.endDate = null;
        this.typeCode = '_ALL';
        this.pageSize = AppConsts.PageSize;
        this.pageIndex = AppConsts.PageIndex;
        this.lotteryName = '_ALL';
        this.bettingId = 0;
        this.userName = null;
    }
    startDate: string;
    endDate: string;
    typeCode: string;
    pageSize: number;
    pageIndex: number;
    lotteryName: string;
    bettingId: number;
    userName: string;
}
export class TeamAccountInput {
    constructor() {
        this.startDate = null;
        this.endDate = null;
        this.typeCode = '_ALL';
        this.pageSize = AppConsts.PageSize;
        this.pageIndex = AppConsts.PageIndex;
        this.subUserName = '';
    }
    startDate: string;
    endDate: string;
    typeCode: string;
    pageSize: number;
    pageIndex: number;
    subUserName: string;
}
