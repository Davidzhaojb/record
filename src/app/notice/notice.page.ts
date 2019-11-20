import { Component, Injector } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';
@Component({
    selector: 'app-notice',
    templateUrl: 'notice.page.html',
    styleUrls: ['notice.page.scss']
})
export class NoticePage extends AppBasePage {
    constructor(
        injector: Injector,
    ) {
        super(injector);
    }
    ionViewDidEnter() {
    }
}
