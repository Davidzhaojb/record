/**
 * 登录调用 api/token 返回参数构建
 * evan 2019-07-24
 */
export class SigninOutputModel {
    /** 默认构造函数、用来创建对象 如  signinOutput = new SigninOutputModel()  后面new 关键字就是根据constructor 来创建对象的 */
    constructor() {
        this.access_token = null;
        this.expires_in = null;
        this.token_type = null;
    }
    /** 用户登录成功后返回的token */
    // tslint:disable-next-line: variable-name
    access_token: string;

    /** token过期时间 */
    // tslint:disable-next-line: variable-name
    expires_in: number;

    /** token 类型 */
    // tslint:disable-next-line: variable-name
    token_type: string;

}
