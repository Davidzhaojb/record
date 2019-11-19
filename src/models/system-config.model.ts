/**
 * 接口返回信息处理
 * David 2019-09-06
 * @param code 返回的错误代码
 * @param data 返回的数据
 * @param error 请求成功或失败 0:表示请求成功  1:表示请求失败
 * @param message 请求成功或失败返回的信息
 */
export class ResponseResultModel {
    constructor() {
        this.code = null;
        this.data = null;
        this.error = null;
        this.message = null;
    }

    /** 返回的错误代码  */
    code: number;

    /** 返回的数据 */
    data: any;

    /** 请求成功或失败 0:表示请求成功  1:表示请求失败   */
    error: number;

    /** 请求成功或失败返回的信息 */
    message: string;
}

/**
 * @params 测速
 * @param author David 2019-10-24
 */
export class UrlModel {
    constructor() {
        this.urlVal = null;
        this.pingVal = null;
        this.numberVal = null;
        this.colorVal = null;
    }
    /**
     * @params 线路名
     */
    urlVal: string;
    /**
     * @params ping值
     */
    pingVal: string;
    /**
     * @params 线路编号
     */
    numberVal: number;
    /**
     * @params 根据ping值显示的线路颜色
     */
    colorVal: string;
}
