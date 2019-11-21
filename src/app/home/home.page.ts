import { Router } from '@angular/router';
import { Component, Injector, OnInit } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';
import { MyobserverService } from 'src/providers/myobserve.service';
import { CreateNotesService } from 'src/services/createnotes.service';
import { AppConsts } from 'src/shared/app-consts';
import * as moment from 'moment';
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
    /**
     * @params 全部笔记列表
     */
    public notesList: any;
    //#endregion
    constructor(
        injector: Injector,
        private myobser: MyobserverService,
        private notes: CreateNotesService
    ) {
        super(injector);
        this.skinArr = AppConsts.skinArr;
    }

    ionViewDidEnter() {
        this.getAllNotes();
    }

    /**
     * @params 切换主题
     * @param author David 2019-10-30
     */
    toggleAppTheme(color, skin) {
        this.myobser.setActiveTheme(color);
        this.storageService.writeString('COLOR', color);
    }
    /**
     * @params 获取所有笔记
     * @param author David 2019-11-21
     */
    getAllNotes() {
        this.notes.getAllNotes().subscribe(s => {
            if (s) {
                this.notesList = s.data;
                this.notesList.forEach(e => {
                    e.updatedAt = moment(e.updatedAt, moment.ISO_8601).format('YYYY-MM-DD HH:mm:ss');
                });
                this.storageService.write('NotesList', this.notesList);
            }
        });
    }

    /**
     * @params 删除
     * @param author David 2019-11-21
     */
    delete(id) {
        this.notes.deleteNotes(id).subscribe(s => {
            if (s.code === 1) {
                this.toastService.success(s.msg, '', 'middle');
                this.getAllNotes();
            } else {
                this.toastService.error(s.msg, '', 'middle');
            }
        });
    }
}
