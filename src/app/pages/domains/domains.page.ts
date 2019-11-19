import { Component, OnInit, Injector } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SystemconfigService } from 'src/services/system-config.service';
import { UrlModel } from 'src/models/system-config.model';
import * as $ from 'jquery';
import { RouterService } from 'src/providers/router.service';
import { AppBasePage } from 'src/shared/app-base-page';

@Component({
    selector: 'app-domains',
    templateUrl: './domains.page.html',
    styleUrls: ['./domains.page.scss']
})
export class DomainsPage extends AppBasePage implements OnInit {
    /**
     * @params 是否已经选择最快线路
     */
    // public isChangLine = false;
    apiUrlList: any;
    autourl: any;
    urlCount: number;
    isHasUrl: boolean = false;
    noGuide: boolean = false;
    constructor(
        injector: Injector,
        private sysService: SystemconfigService,
        private router: RouterService,
        private navctrl: NavController
    ) {
        super(injector);
    }

    ngOnInit() {
        this.getPlatformLineLists();
    }
    // 获取所有域名
    getPlatformLineLists() {
        this.autourl = [];
        this.sysService.getPlatformLineList().subscribe(res => {
            if (res !== undefined) {
                this.isHasUrl = true;
                res.forEach(r => {
                    // tslint:disable-next-line: new-parens
                    const unit = new UrlModel();
                    if (r.LineType === 3) {
                        unit.urlVal = r.LineUrl;
                        this.autourl.push(unit);
                    } else if (r.LineType === 3) {
                        unit.urlVal = r.LineUrl;
                        this.autourl.push(unit);
                    }
                });
            }
            this.getPing();
        });
    }

    /**
     * @params 获取ping值
     * @param author David 2019--9-10
     */
    getPing() {
        const $this = this;
        this.autourl.forEach((r, i) => {
            this.ping({
                url: r.urlVal,
                // tslint:disable-next-line: object-literal-shorthand
                i: i,
                interval: 60,
                afterPing: (ping, opt) => {
                    ping = parseFloat(ping) / 2;
                    // tslint:disable-next-line: radix
                    r.pingVal =
                        ping >= 3000
                            ? '>3s'
                            : ping > 300
                            ? '>300ms'
                            : parseInt(ping) + 'ms';
                    r.colorVal =
                        ping >= 300 ? 'red' : ping > 200 ? 'orange' : 'green';
                    r.numberVal = ping;
                    // 升序排序
                    $this.autourl = $this.autourl.sort((a, b) => {
                        return a.numberVal - b.numberVal;
                    });
                }
            });
        });
        // this.defaultApiUrl();
    }

    /**
     * @params 请求域名时的时间与返回的时间差
     * @param Author David 2019-09-10
     */
    ping(option) {
        let ping, requestTime, responseTime;
        // 保证url带http://
        const getUrl = url => {
            const strReg = '^((https|http)?://){1}';
            const re = new RegExp(strReg);
            return re.test(url) ? url : 'http://' + url;
        };
        $.ajax({
            // 设置一个空的ajax请求
            url: getUrl(option.url) + '/api/?' + new Date().getTime(),
            type: 'GET',
            dataType: 'html',
            timeout: 3000,
            beforeSend: () => {
                if (option.beforePing) {
                    option.beforePing();
                }
                requestTime = new Date().getTime();
            },
            success: (xhr, status) => {
                responseTime = new Date().getTime();
                ping = Math.abs(requestTime - responseTime);
                if (status === 'timeout') {
                }
                if (option.afterPing) {
                    option.afterPing(ping, option);
                }
            },
            error: err => {
                responseTime = new Date().getTime();
                ping = Math.abs(requestTime - responseTime);
                option.disabled = false;
                if (option.afterPing) {
                    option.afterPing(ping, option);
                }
            }
        });
    }

    // defaultApiUrl() {
    //     this.isChangLine = true;
    //     console.log('选择默认线路');
    //     const url = this.autourl[0].urlVal;
    //     localStorage.setItem('apiUrl', url);
    //     this.router.goRouterNav('/signin');
    // }
    /**
     * @params 保存当前线路
     * @param author David 2019-10-25
     */
    saveApiUrl(url) {
        localStorage.setItem('apiUrl', url);
        this.navctrl.back();
    }
}
