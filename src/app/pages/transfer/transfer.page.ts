import { Component, OnInit, Injector } from '@angular/core';
import { AppConsts } from '../../../shared/app-consts';
import { AppBasePage } from 'src/shared/app-base-page';
import { ThirdGameService } from 'src/services/third-game.service';
import { zip } from 'rxjs';
import { UserService } from 'src/services/user.service';

@Component({
    selector: 'app-transfer',
    templateUrl: './transfer.page.html',
    styleUrls: ['./transfer.page.scss'],
})
export class TransferPage extends AppBasePage implements OnInit {
    /**
     * @params 转出账户
     */
    public transferPlatformO = [];
    /**
     * @params 转入账户
     */
    public transferPlatformE = [];
    /**
     * @params 用户余额
     */
    public userMoney: number;
    /**
     * @params ag余额
     */
    public agBalance: number;
    /**
     * @params ug余额
     */
    public ugBalance: number;
    /**
     * @params ky余额
     */
    public kyBalance: number;
    /**
     * @params ebet余额
     */
    public ebetBalance: number;
    /**
     * @params 转出状态
     */
    public out: any;
    /**
     * @params 转入状态
     */
    public in: any;
    /**
     * @params 当转出账户为彩票账户的时候，设置转入账户的彩票账户为不可选
     */
    public hideLottery: boolean;
    /**
     * @params 转账金额
     */
    public Amount: any;
    /**
     * @params 转出账户
     */
    public from: string;
    /**
     * @params 转入账户
     */
    public to: string;
    /**
     * @params 转出账户，转入账户，转账金额都填完，按钮变成可点击
     */
    public unClick: boolean;
    /**
     * @params 报表查询参数
     */
    public params: any;
    constructor(
        injector: Injector,
        private thirdgame: ThirdGameService,
        private userservice: UserService,
    ) {
        super(injector);
        this.hideLottery = false;
        this.unClick = true;
        this.transferPlatformO = AppConsts.transferPlatformOut;
        this.transferPlatformE = AppConsts.transferPlatformEnter;
        this.params = {
            Amount: this.Amount,
            From: this.from,
            To: this.to
        };
    }

    ngOnInit() {
        // this.getBalance();
    }
    /**
     * @params 获取全部能获取到的余额
     * @param author David 2019-11-11
     */
    async getBalance() {
        // tslint:disable-next-line: deprecation
        zip(
            this.thirdgame.getAgBalance().pipe(),
            this.thirdgame.getUgBalance().pipe(),
            this.thirdgame.getKaiYuanBalance().pipe(),
            this.thirdgame.getEbetBalance().pipe(),
            this.userservice.getUserMoney().pipe(),
            (agbalance, ugbalance, kybalance, ebetbalance, usermoney) => {
                console.log(agbalance);
                console.log(ugbalance);
                console.log(kybalance);
                console.log(ebetbalance);
                console.log(usermoney);
            }
        ).subscribe(
            res => {
                // this.loadingService.loaderDismiss();
                // this.routerService.goRouterNav('/protocol');
            },
            err => {
                // this.loadingService.loaderDismiss();
            }
        );
    }
    /**
     * @params 进入转账报表页面
     * @param author David 2019-11-15
     */
    enterDetail() {
        this.routerService.goRouterNav('/transfer-record');
    }
    /**
     * @params 转出
     * @param author David 2019-11-11
     */
    transferOut(o) {
        this.out = o;
        this.from = o;
        this.params.From = this.from;
        if (o === 'lottery') {
            this.transferPlatformE[0].select = true;
            this.transferPlatformE[1].select = false;
            this.transferPlatformE[2].select = false;
            this.transferPlatformE[3].select = false;
            this.transferPlatformE[4].select = false;
        } else {
            this.transferPlatformE[0].select = false;
            this.transferPlatformE[1].select = true;
            this.transferPlatformE[2].select = true;
            this.transferPlatformE[3].select = true;
            this.transferPlatformE[4].select = true;
        }
        this.isAllChecked();
    }
    /**
     * @params 转入
     * @param author David 2019-11-11
     */
    transferIn(i) {
        this.in = i;
        this.to = i;
        this.params.To = this.to;
        this.isAllChecked();
    }
    /**
     * @params 检测输入的转账金额是否格式正确
     * @param author David 2019-11-16
     */
    onKeyPress(event: any) {
        this.params.Amount = this.Amount;
        const keyCode = event.keyCode;
        if (keyCode >= 48 && keyCode <= 57 || keyCode === 8 || keyCode >= 96 && keyCode <= 105) {
            event.returnValue = true;
        } else {
            event.returnValue = false;
        }
        this.isAllChecked();
    }
    /**
     * @params 转账
     * @param author David 2019-11-16
     */
    doTransfer() {
        console.log('dotransfer', this.params);
        if (this.params.From === 'ag' || this.params.To === 'ag') {
            this.agTransfer();
        } else if (this.params.From === 'ug' || this.params.To === 'ug') {
            this.ugTransfer();
        } else if (this.params.From === 'ky' || this.params.To === 'ky') {
            this.kyTransfer();
        } else if (this.params.From === 'ebet' || this.params.To === 'ebet') {
            this.ebetTransfer();
        }
    }
    /**
     * @params 检测参数是否齐全
     * @param author David 2019-11-16
     */
    isAllChecked() {
        if (this.params.Amount !== undefined && this.params.From !== undefined && this.params.To !== undefined) {
            this.unClick = false;
        }
    }

    /**
     * @params ebet转账
     * @param author David 2019-11-19
     */
    ebetTransfer() {
        if (this.params.Amount === '0' || this.params.Amount === undefined) {
            this.alertService.presentAlert('请输入正确的转账金额!');
        } else {
            if (this.params.From === 'ebet') {
                this.thirdgame.ebetTransfer(this.Amount, 1).subscribe(s => {
                    if (s.Result) {
                        this.userservice.getUserMoney();
                        this.thirdgame.getEbetBalance();
                        this.alertService.presentAlert('转账成功!');
                    } else {
                        this.alertService.presentAlert('转账失败!');
                    }
                });
            } else {
                this.thirdgame.ebetTransfer(this.Amount, 0).subscribe(s => {
                    if (s.Result) {
                        this.userservice.getUserMoney();
                        this.thirdgame.getEbetBalance();
                        this.alertService.presentAlert('转账成功!');
                    } else {
                        this.alertService.presentAlert('转账失败!');
                    }
                });
            }
        }
    }
    /**
     * @params 开元转账
     * @param author David 2019-11-16
     */
    kyTransfer() {
        if (this.params.Amount === '0' || this.params.Amount === undefined) {
            this.alertService.presentAlert('请输入正确的转账金额!');
        } else {
            if (this.params.From === 'ky') {
                this.thirdgame.transferFromKaiYuan(this.Amount).subscribe(s => {
                    if (s.Result) {
                        this.userservice.getUserMoney();
                        this.thirdgame.getKaiYuanBalance();
                        this.alertService.presentAlert('转账成功!');
                    } else {
                        this.alertService.presentAlert('转账失败!');
                    }
                });
            } else {
                this.thirdgame.transferToKaiYuan(this.Amount).subscribe(s => {
                    if (s.Result) {
                        this.userservice.getUserMoney();
                        this.thirdgame.getKaiYuanBalance();
                        this.alertService.presentAlert('转账成功!');
                    } else {
                        this.alertService.presentAlert('转账失败!');
                    }
                });
            }
        }
    }
    /**
     * @params ug转账
     * @param author David 2019-11-16
     */
    ugTransfer() {
        if (this.params.Amount === '0' || this.params.Amount === undefined) {
            this.alertService.presentAlert('请输入正确的转账金额!');
        } else {
            if (this.params.From === 'ug') {
                this.thirdgame.transferFromUg(this.Amount, 1).subscribe(s => {
                    if (s.Result) {
                        this.userservice.getUserMoney();
                        this.thirdgame.getUgBalance();
                        this.alertService.presentAlert('转账成功!');
                    } else {
                        this.alertService.presentAlert('转账失败!');
                    }
                });
            } else {
                this.thirdgame.transferToUg(this.Amount, 0).subscribe(s => {
                    if (s.Result) {
                        this.userservice.getUserMoney();
                        this.thirdgame.getUgBalance();
                        this.alertService.presentAlert('转账成功!');
                    } else {
                        this.alertService.presentAlert('转账失败!');
                    }
                });
            }
        }
    }
    /**
     * @params ag转账
     * @param author David 2019-11-16
     */
    agTransfer() {
        if (this.params.Amount === '0' || this.params.Amount === undefined) {
            this.alertService.presentAlert('请输入正确的转账金额!');
        } else {
            this.thirdgame.agTransfer(this.params).subscribe(s => {
                if (s.Result) {
                    this.userservice.getUserMoney();
                    this.thirdgame.getAgBalance();
                    this.alertService.presentAlert('转账成功!');
                } else {
                    this.alertService.presentAlert('转账失败!');
                }
            });
        }
    }
}
