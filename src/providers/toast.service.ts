import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    constructor(private toastController: ToastController) { }

    public async presentToast(
        message: string,
        header?: string,
        position?,
        color = 'dark',
        duration = 3000
    ) {
        const toast = await this.toastController.create({
            header: header,
            message: message,
            duration: duration,
            animated: true,
            color: color,
            position: position,
            showCloseButton: true,
            closeButtonText: 'x'
        });
        await toast.present();
        return toast;
    }

    /**
     * toast默认信息提示 颜色为 primary
     * @param message 提示信息 为必填项目
     * @param header 信息标题 为非必填
     * @param position 信息提示显示位置设置 "top" || 'bottom' || 'middle' 默认为 'bottom'
     */
    public async info(message, header?, position?) {
        return await this.presentToast(message, header, position, 'primary');
    }

    /**
     * toast成功信息提示 颜色为 success
     * @param message 提示信息 为必填项目
     * @param header 信息标题 为非必填
     * @param position 信息提示显示位置设置 "top" || 'bottom' || 'middle' 默认为 'bottom'
     */
    public async success(message, header?, position?) {
        return await this.presentToast(message, header, position, 'success');
    }

    /**
     * toast警告信息提示 颜色为 warning
     * @param message 提示信息 为必填项目
     * @param header 信息标题 为非必填
     * @param position 信息提示显示位置设置 "top" || 'bottom' || 'middle' 默认为 'bottom'
     */
    public async warning(message, header?, position?) {
        return await this.presentToast(message, header, position, 'warning');
    }

    /**
     * toast异常信息提示 颜色为 danger
     * @param message 提示信息 为必填项目
     * @param header 信息标题 为非必填
     * @param position 信息提示显示位置设置 "top" || 'bottom' || 'middle' 默认为 'bottom'
     */
    public async error(message, header?, position?) {
        return await this.presentToast(message, header, position, 'danger');
    }

    /**
     * toast异常信息提示 颜色为 danger
     * @param message 提示信息 为必填项目
     * @param header 信息标题 为非必填
     * @param position 信息提示显示位置设置 "top" || 'bottom' || 'middle' 默认为 'bottom'
     */
    public async loginerror(message, position?, color?) {
        return await this.presentToast(message, null, 'middle', 'danger');
    }
}
