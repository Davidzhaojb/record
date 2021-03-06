import { Component, Injector, OnInit } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';
import { CreateNotesService } from 'src/services/createnotes.service';
@Component({
    selector: 'app-trend',
    templateUrl: 'trend.page.html',
    styleUrls: ['trend.page.scss']
})
export class TrendPage extends AppBasePage implements OnInit {
    constructor(
        injector: Injector,
    ) {
        super(injector);
    }
    ngOnInit() {
    }
}
