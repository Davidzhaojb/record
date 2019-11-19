import { Injectable, Injector } from '@angular/core';
import { AppBasePage } from 'src/shared/app-base-page';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import {
    catchError,
    retry,
    mergeMap,
    retryWhen,
    tap,
    scan,
    delay,
    timeout
} from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { Router } from '@angular/router';
const CODEMESSAGE = {
    1: '用户名或密码错误',
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
};

const DEFAULTTIMEOUT = 18000;

const MAXRETRYCOUNT = 2;

@Injectable()
export class ErrorInterceptor extends AppBasePage implements HttpInterceptor {
    constructor(injector: Injector, private router: Router) {
        super(injector);
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            mergeMap(event => {
                // 允许统一对请求错误处理
                // if (event instanceof HttpResponseBase) return this.handleData(event);
                return of(event);
            }),
            timeout(DEFAULTTIMEOUT),
            // retry(2), // retry a failed request up to 3 times
            retryWhen(err$ => {
                return err$.pipe(
                    scan((errCount, err) => {
                        if (errCount >= MAXRETRYCOUNT) {
                            throw err;
                        }
                        return errCount + 1;
                    }, 0),
                    delay(1000),
                    tap(errCount => {
                        if (errCount === 1) {
                            // 第一次重试时显示友好信息
                            this.toastService.info(
                                '网络超时',
                                '正在重新请求中...',
                                'middle'
                            );
                        }
                    })
                );
            }),
            catchError((err: HttpErrorResponse) => this.handleResponse(err))
        );
    }

    /**
     * HTTP请求状态访问对应异常信息说明
     * evan 2019-10-23
     */
    private checkStatus(event) {
        if (
            (event.status >= 200 && event.status < 300) ||
            event.status === 401
        ) {
            return;
        }
        const errorText = CODEMESSAGE[event.status] || event.statusText;
        this.toastService.error(errorText, null, 'middle');
    }

    /**
     * http请求统一异常处理
     * @param err 返回的数据
     * evan 2019-10-23
     */
    private handleResponse(ev): Observable<any> {
        this.checkStatus(ev);
        // console.log('ev', ev);
        switch (ev.status) {
            case 200:
                // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
                // 例如响应内容：
                //      错误内容：{ status: 1, msg: '非法参数' }
                //      正确内容：{ status: 0, response: {  } }
                // 则以下代码片断可直接适用
                // if (event instanceof HttpResponse) {
                //     const body: any = event.body;
                //     if (body && body.status !== 0) {
                //         this.msg.error(body.msg);
                //         // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
                //         // this.http.get('/').subscribe() 并不会触发
                //         return throwError({});
                //     } else {
                //         // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码
                //         return of(new HttpResponse(Object.assign(event, { body: body.response })));
                //         // 或者依然保持完整的格式
                //         return of(event);
                //     }
                // }
                break;
            // case 400:
            //     this.loadingService.loaderDismiss();
            //     break;
            case 401:
                // 返回登录页面
                this.toastService.error(
                    '未登录或登录已过期，请重新登录。',
                    null,
                    'middle'
                );
                this.loadingService.loaderDismiss();
                this.router.navigate(['/signin']);
                break;
            case 403:
            case 404:
            case 500:
                this.loadingService.loaderDismiss();
                this.router.navigateByUrl('/exception/' + ev.status);
                break;
            default:
                if (ev instanceof HttpErrorResponse) {
                    return throwError(ev);
                }
                break;
        }
        return of(ev);
    }
}
