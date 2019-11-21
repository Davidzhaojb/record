import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppBasePage } from 'src/shared/app-base-page';

@Component({
    selector: 'app-note-detail',
    templateUrl: './note-detail.page.html',
    styleUrls: ['./note-detail.page.scss'],
})
export class NoteDetailPage extends AppBasePage implements OnInit {
    /**
     * @params 当前笔记的id
     */
    public currentId: any;
    /**
     * @params 获取所有笔记
     */
    public notesArray;
    /**
     * @params  当前笔记
     */
    public currendNotes: any;
    constructor(
        injector: Injector,
        private route: ActivatedRoute
    ) {
        super(injector);
    }

    ngOnInit() {
        this.notesArray = this.storageService.read('NotesList');
        this.route.paramMap.subscribe(params => {
            this.currentId = params.get('detailId');
            this.getNotes();
        });
    }
    /**
     * @params 根据id展示对应的文章
     * @param author David 2019-11-21
     */
    getNotes() {
        this.notesArray.forEach(s => {
            if (s.id === Number(this.currentId)) {
                this.currendNotes = s;
            }
        });
    }
}
