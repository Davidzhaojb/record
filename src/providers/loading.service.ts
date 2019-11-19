import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    /**
     * 当前加载对象
     * Evan 2019-10-22
     * update Evan 2019-10-22
     */
    currentLoading = null;

    /**
     * 是否显示加载中
     * Evan 2019-10-22
     * update Evan 2019-10-22
     */
    isLoading: boolean = true;

    /**
     * 构造函数
     * @param loadingController
     */
    constructor(public loadingController: LoadingController) {}

    /**
     * 创建加载对象并显示..
     * Evan 2019-10-22
     * update Evan 2019-10-22
     */
    async presentLoader() {
        // Dismiss previously created loading
        if (this.currentLoading != null) {
            await this.loadingController.dismiss();
        }
        this.currentLoading = await this.loadingController.create({
            spinner: 'bubbles',
            duration: 0,
            message: '',
            translucent: true
        });
        return await this.currentLoading.present();
    }

    /**
     * 销毁加载对象..
     * Evan 2019-10-22
     * update Evan 2019-10-22
     */
    async loaderDismiss() {
        if (this.currentLoading != null) {
            this.isLoading = false;
            this.currentLoading = null;
            await this.loadingController.dismiss();
        }
    }
}
