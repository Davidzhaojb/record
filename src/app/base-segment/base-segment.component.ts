import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-base-segment',
    templateUrl: './base-segment.component.html',
    styleUrls: ['./base-segment.component.scss'],
})
export class BaseSegmentComponent implements OnInit {
    // @Input() filter: any;
    @Output() doFilter: EventEmitter<any> = new EventEmitter();
    public msg: string;
    constructor() {
        this.msg = '我是子组件的一个msg';
    }

    ngOnInit() {
    }
    /**
     * @params segment点击事件
     * @param author David 2019-11-15
     */
    Filter(value) {
        this.doFilter.emit(value);
    }
}
