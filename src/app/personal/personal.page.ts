import { Component, OnInit, Injector } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';
@Component({
    selector: 'app-personal',
    templateUrl: './personal.page.html',
    styleUrls: ['./personal.page.scss']
})
export class PersonalPage extends AppBasePage implements OnInit {
    constructor(
        injector: Injector,
    ) {
        super(injector);
    }
    ngOnInit() {
    }
    exit() {
        this.routerService.logOut();
    }
}
