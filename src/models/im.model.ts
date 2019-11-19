/**
 * @params 发送消息
 * @param author David 2019-10-31
 */
export class SendMessageModel {
    /**
     * @params 发送消息对象的用户名
     */
    ToUserName: string;
    /**
     * @params 发送的消息
     */
    Message: string;
    /**
     * @params Type=1 是所有人   2 是所有下级  3自由选中（要传用户名）
     */
    Type: number;
}
/**
 * @params 获取历史聊天记录
 * @param author David 2019-10-31
 */
export class GetMessageModel {
    /**
     * @params 发送消息的对象
     */
    toUserName: string;
    /**
     * @params 单次获取到的消息条数
     */
    pageSize: number;
    /**
     * @params 消息分页
     */
    pageIndex: number;
}
// 获取最新的消息推送
export class GetNewMessageModel {
    /**
     * @params 发送消息的对象
     */
    toUserName: string;
    /**
     * @params 当前历史消息的最大ID
     */
    maxId: any;
    /**
     * @params 单次获取到的消息条数
     */
    pageSize: number;
    /**
     * @params 否是最新消息
     */
    isNewMessage: boolean;
}
// 展示的消息列表
export class ShowMessageList {
    toUserName: string;
    /**
     * @params 发送时间
     */
    sendTime: Date;
    /**
     * @params 消息内容
     */
    text: string;
}
