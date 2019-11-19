export class EmojiListModel {
    constructor() {
        this.isShowTab = false;
        this.position = 'topLeft';
        this.emojiList = [];
    }

    /**
     * 当只有一组表情时，是否仍然显示表情分组Tab。
     */
    isShowTab?: boolean;
    /**
     * 表情面板位置
     */
    position?: string;
    /**
     * 表情组
     */
    emojiList?: EmojiGroupModel[];

}

export class EmojiGroupModel {
    constructor() {
        this.groupName = null;
        this.path = null;
        this.maxLength = 0;
        this.postfix = null;
        this.placeholder = null;
        this.excludeNums = [];
        this.emojiExtend = [];
    }

    /**
     * 表情组名称
     */
    groupName?: string;

    /**
     * 该组表情路径
     */
    path?: string;

    /**
     * 该组表情文件名的最大数
     */
    maxLength?: number;

    /**
     * 表情文件的后缀名
     */
    postfix?: string;

    /**
     * 该组表情插入文本框后的占位标识，必须包含'{alias}'部分，'{alias}'会被自动替换成每个表情的标识
     */
    placeholder?: string;

    /**
     * 要排除的表情组
     */
    excludeNums?: string[] | number[];

    /**
     * 表情集合
     */
    emojiExtend?: EmojiEntity[];

}

export class EmojiEntity {

    constructor() {
        this.id = null;
        this.name = null;
        this.title = null;
    }

    /** 表情唯一Id */
    id?: string | number;
    /** 表情名称 */
    name?: string;
    /** 每个表情鼠标放上去后显示的对应的文字 */
    title?: string;
    /** 是否显示 */
    isShow: boolean;
}



export class SendMessageModel {
    ToUserName: string;     // 发送消息对象的用户名
    Message: string;        // 发送的消息
    Type: number             // Type=1 是所有人   2 是所有下级  3自由选中（要传用户名）
}
// 获取历史聊天记录
export class GetMessageModel {
    toUserName: string;
    pageSize: number;       // 单次获取到的消息条数
    pageIndex: number;      // 消息分页
}
// 获取最新的消息推送
export class GetNewMessageModel {
    toUserName: string;
    maxId: any;            //当前历史消息的最大ID
    pageSize: number;      //单次获取到的消息条数
    isNewMessage: boolean; //是否是最新消息
}
// 展示的消息列表
export class ShowMessageList {
    toUserName: string;
    sendTime: any;       // 发送时间
    text: string;         // 消息内容
}
