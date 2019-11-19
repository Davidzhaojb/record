import { Component, OnInit, Injector } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';
import { SystemconfigService } from 'src/services/system-config.service';

@Component({
    selector: 'app-protocol',
    templateUrl: './protocol.page.html',
    styleUrls: ['./protocol.page.scss']
})
export class ProtocolPage extends AppBasePage implements OnInit {
    /**
     * @params 协议内容
     */
    protocolContent: string;

    constructor(injector: Injector, private sysconfig: SystemconfigService) {
        super(injector);
    }

    ngOnInit() {
        this.protocolContent = '';
        this.getAgreement();
    }
    /**
     * @params 获取协议
     * @param author David 2019-10-04
     */
    getAgreement() {
        this.sysconfig.getAgreement().subscribe(res => {
            if (res) {
                this.protocolContent = res;
            }
        });
    }
    /**
     * @params 拒绝
     * @param author David 2019-10-04
     */
    disagreeClick() {
        this.storageService.remove('sysconfig');
        this.storageService.remove('User');
        this.storageService.remove('password');
        this.storageService.remove('hotLotterys');
        this.routerService.goRouterNav('/signin');
    }

    /**
     * @params 同意
     * @param author David 2019-10-04
     */
    agreeClick() {
        // this.sysconfig.getSysconfig().subscribe(
        //     res => {
        //         this.storageService.write('sysconfig', res);
        //     },
        //     err => {}
        // );

        this.routerService.goRouterNav('/tabs/home');
    }
}
