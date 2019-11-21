import { Component, OnInit, Injector } from '@angular/core';
import { MyobserverService } from 'src/providers/myobserve.service';
import { CreateNotesService } from 'src/services/createnotes.service';
import { AppBasePage } from 'src/shared/app-base-page';

@Component({
    selector: 'app-add',
    templateUrl: './add.page.html',
    styleUrls: ['./add.page.scss'],
})
export class AddPage extends AppBasePage implements OnInit {
    /**
     * @params 标题
     */
    public title: string;
    /**
     * @params 副标题
     */
    public subTitle: string;
    /**
     * @params 内容
     */
    public content: string;
    /**
     * @params 参数
     */
    public params: any;
    constructor(
        injector: Injector,
        private myobser: MyobserverService,
        private notes: CreateNotesService
    ) {
        super(injector);
        this.params = {
            notesTitle: this.title,
            notesSubtitle: this.subTitle,
            notesContent: this.content
        };

    }

    ngOnInit() {
    }
    /**
     * @params 创建笔记
     * @param author David 2019-11-20
     */
    createNotes() {
        if (!this.title || !this.subTitle || !this.content) {
            this.toastService.error('标题或内容不可为空!', '', 'middle');
            return;
        } else {
            this.params.notesTitle = this.title;
            this.params.notesSubtitle = this.subTitle;
            this.params.notesContent = this.content;
            this.notes.createNotes(this.params).subscribe(s => {
                if (s) {
                    if (s.code === 1) {
                        this.toastService.success(s.msg, '', 'middle');
                        this.routerService.goRouterNav('/tabs/home');
                        this.title = '';
                        this.subTitle = '';
                        this.content = '';
                    } else {
                        this.toastService.error(s.msg, '', 'middle');
                    }
                }
            });
        }
    }
}
