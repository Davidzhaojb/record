import { Component, Input } from '@angular/core';

@Component({
    selector: 'back-icon',
    template: `<ion-icon name="arrow-back" (click)="back()" [ngStyle]="{'font-size.rem': _size}"></ion-icon>`,
    styles: [`
    ion-icon {
      font-size: 1.4rem;
    }
  `]
})
export class BackIconComponent {
    // tslint:disable-next-line:variable-name
    _size = 2;
    @Input() set size(val: string) {
        if (val === 'md') {
            this._size = 2;
        } else if (val === 'sm') {
            this._size = 1.4;
        }
    }
    back() {
        console.log('返回');
        window.history.back();
    }
}
