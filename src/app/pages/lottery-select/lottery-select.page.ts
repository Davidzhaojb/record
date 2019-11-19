import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';
import { LotteryModel } from 'src/models/lottery.model';
import { IonReorderGroup } from '@ionic/angular';

@Component({
    selector: 'app-lottery-select',
    templateUrl: './lottery-select.page.html',
    styleUrls: ['./lottery-select.page.scss'],
})
export class LotterySelectPage extends AppBasePage implements OnInit {
    @ViewChild(IonReorderGroup, { static: true }) reorderGroup: IonReorderGroup;

    /**
     * @params 所有彩种
     */
    public lotterys: LotteryModel[] = [];
    /**
     * @params 我的彩种
     */
    public likes: LotteryModel[] = [];
    /**
     * @params 剩余彩种
     */
    public leaves: LotteryModel[] = [];
    constructor(
        injector: Injector,
    ) {
        super(injector);
        this.lotterys = this.storageService.read('lotterys');
        this.likes = this.storageService.read('mylotterys');
        this.leaves = this.storageService.read('leaves');
    }

    ngOnInit() {
        this.getLeave();
    }
    /**
     * @params 拖动事件
     * @param author David 2019-10-30
     */
    doReorder(ev: any) {
        ev.detail.complete();
    }
    /**
     * @params 拖动事件
     * @param author David 2019-10-30
     */
    doReorderall(ev: any) {
        ev.detail.complete();
    }
    /**
     * @params 获取剩余彩种
     * @param author David 2019-10-30
     */
    getLeave() {
        this.leaves = [];
        if (this.likes == null || this.likes.length === 0) {
            this.leaves = this.lotterys;
        } else {
            this.lotterys.forEach(e => {
                if (!this.likes.find((s: any) => s.LotteryCode === e.LotteryCode)) {
                    this.leaves.push(e);
                }
            });
        }
        this.storageService.write('mylotterys', this.likes);
        this.storageService.write('leaves', this.leaves);

    }
    /**
     * @params 添加彩种
     * @param author David 2019-10-30
     */
    addition(obj) {
        this.likes.push(obj);
        this.getLeave();
    }

    /**
     * @params 删减彩种
     * @param author David 2019-10-30
     */
    subtraction(obj) {
        const idx = this.likes.findIndex(s => s.ID === obj.ID);
        this.likes.splice(idx, 1);
        this.getLeave();
    }
    /**
     * @params 页面关闭存储彩种
     * @param author David 2019-10-30
     */
    dismiss() {
        // this.storageService.write('likes', this.likes);
        // if (this.likes.length > 0) {
        //     this.ViewCtrl.dismiss(this.likes);
        // } else {
        //     this.ViewCtrl.dismiss(this.lotterys);
        // }
    }
}
