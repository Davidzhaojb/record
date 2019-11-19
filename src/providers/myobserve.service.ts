import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MyobserverService {
    private theme: BehaviorSubject<string>;

    constructor(
    ) {
        this.theme = new BehaviorSubject('dark-time');

    }
    openDistributeIm = new BehaviorSubject<boolean>(true);
    /**
     * @params 换肤
     * @param author David 2019-10-04
     */
    setActiveTheme(val) {
        this.theme.next(val);
    }
    // 获取当前主题样式
    getActiveTheme() {
        return this.theme.asObservable();
    }
}
