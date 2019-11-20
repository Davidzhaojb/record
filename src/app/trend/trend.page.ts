import { Component, Injector, OnInit } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';
import { CreateNotesService } from 'src/services/createnotes.service';
@Component({
    selector: 'app-trend',
    templateUrl: 'trend.page.html',
    styleUrls: ['trend.page.scss']
})
export class TrendPage extends AppBasePage implements OnInit {
    /**
     * @params 全部笔记列表
     */
    public notesList: any;
    constructor(
        injector: Injector,
        private notes: CreateNotesService

    ) {
        super(injector);
    }
    ngOnInit() {
        this.getAllNotes();
    }
    getAllNotes() {
        this.notes.getAllNotes().subscribe(s => {
            if (s) {
                this.notesList = s.data;
                console.log(this.notesList);
            }
        });
    }
}
