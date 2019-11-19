import { Injectable, Injector } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor extends AppBasePage implements HttpInterceptor {

    constructor(injector: Injector) {
        super(injector);
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // 统一加上服务端前缀
        let reqUrl = request.url;
        if (!reqUrl.startsWith('https://') && !reqUrl.startsWith('http://')) {
            reqUrl = environment.apiUrl + reqUrl;
        }
        request = request.clone({ url: reqUrl });
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.storageService.readString('token')}`
            }
        });

        if (request.url.includes('GetPlatformLineList')) {
            request.headers.append(
                'Access-Control-Allow-Headers',
                'Content-Type'
            );
            request.headers.append('Content-Type', 'text/html; charset=utf-8');
            request.headers.append('Access-Control-Allow-Origin', '*');
        }

        return next.handle(request);
    }
}
