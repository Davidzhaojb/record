import { Component, OnInit, Input, Injector } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';

@Component({
    selector: 'app-base-recordmain',
    templateUrl: './base-recordmain.component.html',
    styleUrls: ['./base-recordmain.component.scss'],
})
export class BaseRecordmainComponent extends AppBasePage implements OnInit {
    @Input() withDrawItem: any;
    constructor(
        injector: Injector
    ) {
        super(injector);
    }
    ngOnInit() {
    }
    /**
     * @params 展示提现说明
     * @param 这个样式不要改！不要改！不要改！
     * @param author David 2019-11-13
     */
    showDetail() {
        this.toastService.info(`
        会员账号：${this.withDrawItem.UserName}，
        提现金额：${this.withDrawItem.WithDrawMoney}元,
        提现时间${this.withDrawItem.AddTime}
                                `, '', 'middle');
    }
    /**
     * @params 联系客服
     * @param author David 2019-11-13
     */
    custome() {
        window.open(this.storageService.readString('customerUrl'));
    }
}
