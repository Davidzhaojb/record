import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    /**
     * 当前模态框
     */
    currentAlert = null;

    constructor(private alertController: AlertController) { }

    /**
     * 默认显示为空
     * evan 2019-10-18
     * @param message   提示信息内容
     * @param header    标题
     */
    async presentAlert(message = '', header = '提示信息', className?: string) {
        const alert = await this.alertController.create(
            {
                message: message,
                header: header,
                buttons: ['确认'],
                cssClass: className
            });
        await alert.present();
    }

    /**
     * 确认提示框
     * evan 2019-10-18
     * @param message  提示信息内容
     * @param header   标题
     * @param comfirmCallBack 确认提示回调
     * @param cancelCallBack  取消按钮回调
     */
    async presentComfirmAlert(
        message = '',
        header = '提示信息',
        comfirmCallBack?,
        cancelCallBack?
    ) {
        const alert = await this.alertController.create({
            header: header,
            message: message,
            buttons: [
                {
                    text: '确定',
                    handler: data => {
                        if (comfirmCallBack) {
                            comfirmCallBack(data);
                        }
                    }
                },
                {
                    text: '取消',
                    role: 'cancel',
                    cssClass: 'secondary', // 注意自定义class写在全局
                    handler: data => {
                        if (cancelCallBack) {
                            cancelCallBack(data);
                        }
                    }
                }
            ]
        });
        await alert.present();
    }
}
