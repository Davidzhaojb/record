import { Component, OnInit, Injector } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';
import { inject } from '@angular/core/testing';
import { NavParams, PopoverController } from '@ionic/angular';
import { LotteryPlayDetailModel } from 'src/models/lottery.model';

@Component({
    selector: 'more-menu',
    templateUrl: './more-menu.component.html',
    styleUrls: ['./more-menu.component.scss']
})
export class MoreMenuComponent extends AppBasePage implements OnInit {
    /** 默认彩种玩法明细 */
    selectedPlayModeDetail: LotteryPlayDetailModel;
    constructor(
        injector: Injector,
        private navParams: NavParams,
        private popCtlr: PopoverController
    ) {
        super(injector);
        this.selectedPlayModeDetail = this.navParams.get('selectedPlayModeDetail');
    }

    ngOnInit() {
    }
    playRecomment() {
        this.alertService.presentAlert(this.selectedPlayModeDetail.Algorithm.TipInfo, '玩法介绍');
        this.popCtlr.dismiss();
    }
}

