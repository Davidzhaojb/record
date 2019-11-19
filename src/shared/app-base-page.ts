import { Injector } from '@angular/core';
import { ToastService } from 'src/providers/toast.service';
import { ModalService } from 'src/providers/modal.service';
import { AlertService } from 'src/providers/alert.service';
import { LoadingService } from 'src/providers/loading.service';
import { StorageService } from 'src/providers/storage.service';
import { RouterService } from 'src/providers/router.service';
import { HttpClientService } from 'src/providers/http-client.service';
import { MyobserverService } from 'src/providers/myobserve.service';
import { PopOverService } from 'src/providers/popover.service';

export abstract class AppBasePage {
    toastService: ToastService;
    modalService: ModalService;
    alertService: AlertService;
    loadingService: LoadingService;
    storageService: StorageService;
    routerService: RouterService;
    httpClientService: HttpClientService;
    myObserver: MyobserverService;
    popoverService: PopOverService;
    constructor(injector: Injector) {
        this.popoverService = injector.get(PopOverService);
        this.toastService = injector.get(ToastService);
        this.modalService = injector.get(ModalService);
        this.alertService = injector.get(AlertService);
        this.loadingService = injector.get(LoadingService);
        this.storageService = injector.get(StorageService);
        this.routerService = injector.get(RouterService);
        this.httpClientService = injector.get(HttpClientService);
        this.myObserver = injector.get(MyobserverService);
    }
}
