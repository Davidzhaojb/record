
import { Injectable } from '@angular/core';
import { ModalController } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    /**
     * 当前模态框
     */
    currentModal = null;

    constructor(private modalController: ModalController) {}

    async presentModal(component, componentProps?) {
        const modal = await this.modalController.create({
            component: component,
            componentProps: componentProps
        });
        await modal.present();
    }
}
