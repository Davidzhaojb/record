import { Component, OnInit, Injector } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';
import { UserService } from 'src/services/user.service';
import { SysconfigModel } from 'src/models/user.model';
import { AppConsts } from 'src/shared/app-consts';
import { UserBankService } from 'src/services/userbank.service';
import { zip } from 'rxjs';
import { LoginService } from 'src/services/login.service';
import { BaseSearchComponent } from 'src/app/base-search/base-search.component';

@Component({
    selector: 'app-withdraw',
    templateUrl: './withdraw.page.html',
    styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage extends AppBasePage implements OnInit {
    /**
     * @params 提现手续费
     */
    public serviceCharge: number;
    /**
     * @params 手续费扣费额度
     */
    public deduction: number;
    /**
     * @params 实际到账金额
     */
    public actualMoeny: number;
    /**
     * @params 用户余额
     */
    public userMoney: any;
    /**
     * @params 冻结金额
     */
    public userLockMoney: number;
    /**
     * @params 提现金额
     */
    public drawMoney: any;
    /**
     * @params 最小提现金额
     */
    public minWithDraw: number;
    /**
     * @params 最大提现金额
     */
    public maxWithDraw: number;
    /**
     * @params 下拉框样式
     */
    public customActionSheetOptions: any;
    /**
     * @params 已提现次数
     */
    public withTime: number;
    /**
     * @params 提现次数
     */
    public times: number;
    /**
     * @params 本地缓存sysconfig
     */
    public connect: any;
    /**
     * @params 是否已绑定银行卡
     */
    public isHave: boolean;
    /**
     * @params 银行卡名称
     */
    public cardname: any;
    /**
     * @params 所有已绑定一行卡列表
     */
    public cards: any;
    /**
     * @params 当前已选中的银行卡
     */
    public cardSelect: any;
    /**
     * @params 新绑卡可提现时间
     */
    public newCardLimit: number;
    /**
     * @params 资金密码
     */
    public password: string;
    /**
     * @params 银行卡ID
     */
    public cardnameId: string;
    constructor(
        injector: Injector,
        private userservice: UserService,
        private appconsts: AppConsts,
        private userbankservice: UserBankService,
        private loginservice: LoginService
    ) {
        super(injector);
        this.serviceCharge = 0.000;
        this.deduction = 0.000;
        this.actualMoeny = 0.000;
        this.connect = this.storageService.read<SysconfigModel>('sysconfig');
        this.minWithDraw = this.connect.MinWithDraw;
        this.maxWithDraw = this.connect.MaxWithDraw;
        this.customActionSheetOptions = {
            header: '请选择银行',
        };
    }

    ngOnInit() {
        this.getCashEnable();
        this.getWidthHouer();
        this.getUserMoney();
        this.getUser();
    }
    /**
     * @params 获取用户余额
     * @param author David 2019-11-12
     */
    getUserMoney() {
        this.userservice.getUserMoney().subscribe(res => {
            this.userMoney = res;
        });
    }
    /**
     * @params 获取User相关信息
     * @param author David 2019-11-12
     */
    getUser() {
        this.loginservice.getUserModel().subscribe(s => {
            this.userLockMoney = s.UserLockMoney;
        });
    }
    /**
     * @params 获取提现手续费
     * @param author David 2019-11-11
     */
    getWidthdrawCharge() {
        this.userservice.getServiceCharge().subscribe(res => {
            if (res) {
                this.serviceCharge = res.WithdrawPercent;
            }
        });
    }
    /**
     * @params 获取新绑卡可提现时间
     * @param author David 2019-11-12
     */
    getWidthHouer() {
        this.userservice.getWithdrawSetting().subscribe(s => {
            this.newCardLimit = s.NewUserBankLimitHours;
        });
    }
    /**
     * @params 计算手续费以提现金额
     * @param author David 2019-11-11
     */
    reset(money) {
        const Reg = /^[0-9]+(.[0-9]{0,3})?$/;
        const isNum = Reg.test(money);
        if (!isNum && money) {
            let tempMoney;
            tempMoney = money + '';
            this.drawMoney = tempMoney.substr(0, tempMoney.length - 1);
        }
        if (this.drawMoney) {
            this.deduction = this.appconsts.accMul(this.drawMoney, this.serviceCharge);
            this.actualMoeny = parseFloat(this.drawMoney) - this.deduction;
            let deductionPointLength = 0;
            if ((this.deduction + '').indexOf('.') >= 0) {
                deductionPointLength = (this.deduction + '').substr((this.deduction + '').indexOf('.'),
                    (this.deduction + '').length).length;
            }
            let actualMoenyLength = 0;
            if ((this.actualMoeny + '').indexOf('.') >= 0) {
                actualMoenyLength = (this.actualMoeny + '').substr((this.actualMoeny + '').indexOf('.'),
                    (this.actualMoeny + '').length).length;
            }
            if (deductionPointLength >= 4) {
                this.deduction = parseFloat((this.deduction + '').substr(0, (this.deduction + '').indexOf('.') + 5));
            }
            if (actualMoenyLength >= 4) {
                this.actualMoeny = parseFloat((this.actualMoeny + '').substr(0, (this.actualMoeny + '').indexOf('.') + 5));
            }
        }
    }
    /**
     * @params 查询是否可提现
     * @param author David 2019-11-11
     */
    async getCashEnable() {
        await this.loadingService.presentLoader();
        this.userservice.getCashEnable().subscribe(s => {
            this.loadingService.loaderDismiss();
            if (s.Result === false) {
                this.alertService.presentComfirmAlert('您的账户未绑定，请绑定账户后提现', '温馨提示', () => {
                    this.routerService.goRouterNav('/personal');
                });
                return;
            } else {
                this.getUserBank();
                this.userservice.getCashTime().subscribe(s => {
                    this.times = this.connect.WithDrawTimes;
                    this.withTime = s;
                });
            }
        });
    }
    /**
     * @params 获取用户银行信息
     * @param author David 2019-11-11
     */
    getUserBank() {
        this.userbankservice.getUserBanks(this.appconsts.PageIndex(), this.appconsts.PageSize()).subscribe(s => {
            if (s === false) {
                this.isHave = false;
                this.cardname = '';
                return false;
            } else {
                this.isHave = true;
                this.cards = s;
                this.cardname = this.cards[0];
                this.cards.forEach(card => {
                    if (card.IsDefault === true) {
                        this.cardSelect = card;
                        this.cardname = this.cardSelect;
                    }
                });
                this.cardSelect = this.cardSelect === undefined ? this.cards[0] : this.cardSelect;
            }
        });
    }
    changeCard(id) {
        this.cards.forEach(element => {
            if (element.BankNum === id) {
                this.cardname.ID = element.ID;
            }
        });
    }
    /**
     * @params 提现
     * @param author David 2019-11-12
     */
    async widthDraw() {
        await this.loadingService.presentLoader();
        if (this.times === 0) {
            this.alertService.presentAlert('您的提现次数已经达到当日最高，请明天再试！');
            return;
        }
        if (!this.cardname.ID) {
            this.alertService.presentAlert('请选择提现银行卡!');
            return;
        }
        // tslint:disable-next-line: deprecation
        zip(
            this.userservice.getUserVarify(this.password).pipe(),
            this.userservice.getDrawMoney(this.password, this.drawMoney, this.cardname.ID).pipe(),
            this.userservice.getCashTime().pipe(),
            (varifyPassword, drawMoney, cashTime) => {
                this.loadingService.loaderDismiss();
                if (!varifyPassword) {
                    this.alertService.presentAlert('密码输入有误，请重新输入');
                    return;
                }
                if (cashTime) {
                    this.times = this.connect.WithDrawTimes - cashTime - 1;
                    this.withTime = cashTime;
                }
                if (drawMoney.Result) {
                    this.toastService.success(drawMoney.Error, '', 'top');
                    // 提现成功，刷新余额，刷新冻结金额
                    this.getUserMoney();
                    this.getUser();
                }
                if (!drawMoney.Result) {
                    this.alertService.presentAlert(drawMoney.Error);
                }
                this.getCashEnable();
                this.drawMoney = '';
                this.password = '';
                this.actualMoeny = 0;
            }).subscribe(
                res => {
                    this.loadingService.loaderDismiss();
                },
                err => {
                    this.loadingService.loaderDismiss();
                }
            );
    }
    /**
     * @params 进入提现报表页面
     * @param author David 2019-11-12
     */
    search() {
        this.routerService.goRouterNav('/widthdraw-record');
    }
}
