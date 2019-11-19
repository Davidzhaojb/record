import { Directive, HostListener, ElementRef, Input, Injector } from '@angular/core';
import Clipboard from 'clipboard/dist/clipboard.min.js';
import { AlertService } from '../providers/alert.service';
import { AppBasePage } from './app-base-page';

/**
 * @params 复制指令
 * @param author David 2019-11-13
 */
@Directive({
    selector: '[copy]'
})
export class CopyDirective extends AppBasePage {
    @Input('copy') cliptext: any;
    constructor(
        injector: Injector,
        private alert: AlertService,
        private el: ElementRef
    ) {
        super(injector);
        const clipboard = new Clipboard(el.nativeElement, {
            text: s => {
                return this.cliptext;
            }
        });
        clipboard.on('success', e => {
            // this.alert.presentAlert('已复制：' + e.text);
            this.toastService.success(`已复制${e.text}`, '', 'middle');
            e.clearSelection();
        });
        clipboard.on('error', e => {
            this.alert.presentAlert('暂不支持此浏览器，请手动复制');
        });
    }
}

