import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Injectable()
export class PopOverService {
    constructor(
        private popoverController: PopoverController
    ) { }
    /**
     * @params popovercontroller
     * @param author David 2019-10-01
     */
    async presentPopover(comp: any, props?: any) {
        const popover = await this.popoverController.create({
            component: comp,
            componentProps: props,
            translucent: true
        });
        await popover.present();
        const { data } = await popover.onWillDismiss();
        console.log(data);
        return data;
    }
}
