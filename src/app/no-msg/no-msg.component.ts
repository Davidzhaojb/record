import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-no-msg',
    templateUrl: './no-msg.component.html',
    styleUrls: ['./no-msg.component.scss'],
})
export class NoMsgComponent implements OnInit {
    @Input() msg: string;
    constructor() {
        if (!this.msg) {
            this.msg = '暂无数据 ~';
        }
    }
    ngOnInit() {

    }

}
