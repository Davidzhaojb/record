import { Router } from '@angular/router';
import { Component, Injector, OnInit } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';
import { MyobserverService } from 'src/providers/myobserve.service';
import { CreateNotesService } from 'src/services/createnotes.service';
import { AppConsts } from 'src/shared/app-consts';

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
     * @params 作者
     */
    public author: string;
    /**
     * @params 参数
     */
    public params: any;
    //#endregion
    constructor(
        injector: Injector,
        private myobser: MyobserverService,
        private notes: CreateNotesService
    ) {
        super(injector);
        this.skinArr = AppConsts.skinArr;
        this.params = {
            notesTitle: this.title,
            notesSubtitle: this.subTitle,
            notesAuthor: this.author,
            notesContent: this.content
        };

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
    /**
     * @params 创建笔记
     * @param author David 2019-11-20
     */
    createNotes() {
        this.params.notesTitle = this.title;
        this.params.notesSubtitle = this.subTitle;
        this.params.notesAuthor = this.author;
        this.params.notesContent = this.content;
        this.notes.createNotes(this.params).subscribe(s => {
            console.log('sss', s);
            if (s) {
                if (s.code === 1) {
                    this.toastService.success(s.msg, '', 'middle');
                }
            }
        });
    }
}
