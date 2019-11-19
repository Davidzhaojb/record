import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastService } from 'src/providers/toast.service';
import { ModalService } from 'src/providers/modal.service';
import { AlertService } from 'src/providers/alert.service';
import { LoadingService } from 'src/providers/loading.service';
import { HTTP_INTERCEPTORS_PROVIDERS } from 'src/helpers';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SystemconfigService } from 'src/services/system-config.service';
import { RouterService } from 'src/providers/router.service';
import { AppConsts } from 'src/shared/app-consts';
import { MyobserverService } from 'src/providers/myobserve.service';
import { UserService } from 'src/services/user.service';
import { LotteryService } from 'src/services/lottery.service';
import { PlatformLocation } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ImService } from 'src/services/im.service';

import { TrendService } from 'src/services/trend.service';
import { ThirdGameService } from 'src/services/third-game.service';
import { UserBankService } from 'src/services/userbank.service';
import { PopOverService } from 'src/providers/popover.service';
import { BaseSearchComponent } from './base-search/base-search.component';
import { WithDrawService } from 'src/services/withdraw.service';
import { TransferService } from 'src/services/transfer.service';

export function appInitializerFactory(
    platformLocation: PlatformLocation,
    http: HttpClient
) {
    return () => {
        return new Promise((resolve, reject) => {
            AppConsts.appBaseHref = getBaseHref(platformLocation);
            const appBaseUrl = getDocumentOrigin() + AppConsts.appBaseHref;
            const appRootUrl = appBaseUrl + 'assets/' + environment.appConfig;
            http.get(appRootUrl).subscribe(
                (res: any) => {
                    checkApiUrl(http, environment.apiUrlList).then(
                        apiList => {
                            console.log('apiList', apiList);
                            resolve(apiList);
                        },
                        err => {
                            reject(err);
                        }
                    );
                },
                err => {
                    reject(err);
                }
            );
        });
    };
}

async function checkApiUrl(http: HttpClient, apiList: any[]) {
    return new Promise((resolve, reject) => {
        let apiCount = 0;
        if (apiList) {
            apiList.forEach(apiItem => {
                http.get(apiItem.apiUrl + '/api').subscribe(
                    res => {
                        apiItem.value = res;
                        apiCount += 1;
                    },
                    err => {
                        apiItem.value = 'no';
                        apiCount += 1;
                    },
                    () => {
                        resolve(apiList);
                    }
                );
            });
        } else {
            reject('暂未配置默认API，请联系管理员处理!');
        }
    });
}

function getDocumentOrigin() {
    if (!document.location.origin) {
        const port = document.location.port ? ':' + document.location.port : '';
        return (
            document.location.protocol +
            '//' +
            document.location.hostname +
            port
        );
    }
    return document.location.origin;
}

export function getBaseHref(platformLocation: PlatformLocation): string {
    const baseUrl = platformLocation.getBaseHrefFromDOM();
    if (baseUrl) {
        return baseUrl;
    }

    return '/';
}

@NgModule({
    declarations: [
        AppComponent,
        BaseSearchComponent,
        // SearchBarComponent
    ],
    entryComponents: [
        BaseSearchComponent,
        // SearchBarComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFactory,
            deps: [PlatformLocation, HttpClient],
            multi: true
        },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        HTTP_INTERCEPTORS_PROVIDERS,
        ToastService,
        ModalService,
        AlertService,
        LoadingService,
        SystemconfigService,
        RouterService,
        AppConsts,
        MyobserverService,
        UserService,
        LotteryService,
        TrendService,
        ImService,
        ThirdGameService,
        UserBankService,
        PopOverService,
        WithDrawService,
        TransferService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
