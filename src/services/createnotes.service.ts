import { Injectable, Inject } from '@angular/core';
import { HttpClientService } from '../providers/http-client.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class CreateNotesService extends HttpClientService {
    constructor(@Inject(HttpClient) http) {
        super(http);
    }
    /**
     * @params 创建笔记
     * @param author David 2019-11-20
     */
    createNotes(params) {
        const reqUrl = '/createnotes';
        return this.post(reqUrl, params);
    }
    /**
     * @params 获取全部笔记
     * @param author David 2019-11-20
     */
    getAllNotes() {
        const reqUrl = '/getallnotes';
        return this.get(reqUrl);
    }
    /**
     * @params 删除笔记
     * @param author David 2019-11-21
     */
    deleteNotes(params) {
        const reqUrl = '/deletenote?id=' + params;
        return this.get(reqUrl);
    }
}
