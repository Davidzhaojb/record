import { Router } from '@angular/router';
import { Component, Injector, OnInit } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';
import { MyobserverService } from 'src/providers/myobserve.service';

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
    //#endregion
    constructor(
        injector: Injector,
        private myobser: MyobserverService,
    ) {
        super(injector);
    }

    ionViewDidEnter() {
    }

    /**
     * @params 切换主题
     * @param author David 2019-10-30
     */
    toggleAppTheme(color, skin) {
        this.myobser.setActiveTheme(color);
        this.storageService.writeString('COLOR', color);
    }
}
