import { Injectable } from '@angular/core';

@Injectable()
export class EmojiService {
    constructor() {
        this.emojiInit();
    }
    // 表情包功能
    // 初始化相应的服务模块
    public emojiInit() {
        RongIMLib.RongIMEmoji.init();
    }
    /**
     * 表情库基本使用方法
     */
    // Emoji 转名称
    emojiToSymbol(sym) {
        return RongIMLib.RongIMEmoji.emojiToSymbol(sym);
    }
    // 名称转 Emoji
    symbolToEmoji(sym) {
        return RongIMLib.RongIMEmoji.symbolToEmoji(sym);
    }
    // Emoji 转 HTML
    emojiToHTML(sym) {
        return RongIMLib.RongIMEmoji.emojiToHTML(sym);
    }
    // 名称转 HTML
    symbolToHTML(sym) {
        return RongIMLib.RongIMEmoji.symbolToHTML(sym);
    }
    // 获取表情库列表
    getEmoji() {
        return RongIMLib.RongIMEmoji.list.map((data) => {
            return data.node;
        });
    }
}