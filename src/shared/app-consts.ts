export class AppConsts {
    constructor(
    ) { }
    /**
     * APP默认路径
     */
    static appBaseUrl: string;

    /**
     * APP初始访问路径
     */
    static appBaseHref: string;

    /**
     * 默认API链接地址
     */
    static remoteApiBaseUrl: string;

    /**
     * signalr 推送链接地址
     */
    static rmeoteSignalrBaseUrl: string;

    /**
     * 客服链接地址
     */
    static customServiceUrl: string;
    /**
     * @params PageIndex
     */
    static PageIndex = 1;
    /**
     * @params PageSize
     */
    static PageSize = 30;
    /**
     * @params 是否显示新消息提醒
     */
    static isShowNewMsg = true;
    /**
     * @params 换肤主题
     */
    /**
     * @params 分页
     */
    static skinArr = [
        { theme: 'red-theme', class: 'skin-red', isChecked: false },
        { theme: 'green-theme', class: 'skin-green', isChecked: false },
        { theme: 'blue-theme', class: 'skin-blue', isChecked: false },
    ];
    /**
     * @params vr玩法
     */
    static vrModel = [
        { LotteryName: 'VR金星1.5分彩', LotteryCode: '1' },
        { LotteryName: 'VR赛车', LotteryCode: '2' },
        { LotteryName: 'VR快艇', LotteryCode: '13' },
        { LotteryName: 'VR彩票百家乐', LotteryCode: '15' },
        { LotteryName: 'VR3分彩', LotteryCode: '11' },
        { LotteryName: 'VR六合彩', LotteryCode: '16' }
    ];
    /**
     * @params 首页头部菜单
     */
    static homeMenu = [
        { src: 'assets/images/home/img-homemenu-01.png', name: '充值', route: '/recharge' },
        { src: 'assets/images/home/img-homemenu-02.png', name: '提现', route: '/withdraw' },
        { src: 'assets/images/home/img-homemenu-03.png', name: '彩票中心', route: 'lotterypage' },
        { src: 'assets/images/home/img-homemenu-04.png', name: '优惠活动', route: 'active' },
        { src: 'assets/images/home/img-homemenu-05.png', name: '客服中心', route: 'customer' },
    ];
    /**
     * @params 第三方游戏列表
     */
    static thirdGameList = [
        { lotteryName: 'KY', src: 'assets/images/home/KY.png', Name: 'KY棋牌娱乐' },
        { lotteryName: 'AG', src: 'assets/images/home/AG.png', Name: 'AG真人视讯' },
        { lotteryName: 'EBET', src: 'assets/images/home/EBET.png', Name: 'ebet真人视讯' },
        { lotteryName: 'UG', src: 'assets/images/home/UG.png', Name: 'UG体育竞技' },
    ];
    /**
     * @params vr游戏
     */
    static vrGameList = [
        { gameName: 'VR金星1.5分彩', gameCode: '1' },
        { gameName: 'VR赛车', gameCode: '2' },
        { gameName: 'VR快艇', gameCode: '13' },
        { gameName: 'VR彩票百家乐', gameCode: '15' },
        { gameName: 'VR3分彩', gameCode: '11' },
        { gameName: 'VR六合彩', gameCode: '16' }
    ];
    /**
     * @params 个人中心菜单列表
     */
    static menuList = [
        {
            name: '代理中心', child: [
                { childName: '成员管理', router: '/domain', icon: 'haoyouliebiao' },
                { childName: '推广开户', router: '/domain', icon: 'open-account' },
                { childName: '日工资设定', router: '/domain', icon: 'set' },
            ], isOpen: true
        },
        {
            name: '报表中心', child: [
                { childName: '个人报表', router: '/selfreport', icon: 'personal-report' },
                { childName: '游戏记录', router: '/gamereport', icon: 'game' },
                { childName: '团队报表', router: '/domain', icon: 'team-report' },
                { childName: '日工资报表', router: '/domain', icon: 'team-report' },
            ], isOpen: true
        },
        {
            name: '个人管理', child: [
                { childName: '安全中心', router: '/securitycenter', icon: 'safe-center' },
                { childName: '我的追号', router: '/domain', icon: 'history' },
                { childName: '活动中心', router: '/domain', icon: 'activity' },
                { childName: '设置', router: '/domain', icon: 'set' },
            ], isOpen: true
        },
        {
            name: '其他功能', child: [
                { childName: '聊天', router: '/domain', icon: 'chat' },
                { childName: '登录地址', router: '/domain', icon: 'address' },
                { childName: '更换线路', router: '/domain', icon: 'clear' },
                { childName: '清理垃圾', router: '/domain', icon: 'clear' },
            ], isOpen: true
        },
    ];
    /**
     * @params 个人中心头部菜单
     * @param author David 2019-10-26
     */
    static finance = [
        { name: '转账', src: 'assets/images/personal-center/transfer.png', route: '/transfer' },
        { name: '转账记录', src: 'assets/images/personal-center/transfer-report.png', route: '/transfer-record' },
        { name: '充值记录', src: 'assets/images/personal-center/recharge-report.png', route: '' },
        { name: '提现记录', src: 'assets/images/personal-center/widthdraw-report.png', route: '/widthdraw-record' }
    ];
    /**
     * @params 全部tab标题
     */
    static title = [
        { name: '号码', value: 1 },
        { name: '大小', value: 2 },
        { name: '单双', value: 3 },
        { name: '龙虎', value: 4 },
        { name: '总和', value: 5 }
    ];
    /**
     * @params 没有龙虎的tab标题
     */
    static titleNoLongHu = [
        { name: '号码', value: 1 },
        { name: '大小', value: 2 },
        { name: '单双', value: 3 },
        { name: '总和', value: 5 }
    ];
    /**
     * @params 六合彩的tab标题
     */
    static titleSix = [
        { name: '号码', value: 1 },
        { name: '大小', value: 2 },
        { name: '单双', value: 3 },
        { name: '特码', value: 5 }
    ];
    /**
     * @params 转账页面 转出账户
     */
    static transferPlatformOut = [
        { name: '彩票账户', value: 'lottery' },
        { name: 'AG账户', value: 'ag' },
        { name: 'UG账户', value: 'ug' },
        { name: 'KY棋牌', value: 'ky' },
        { name: 'EBET账户', value: 'ebet' },
    ];
    /**
     * @params 转账页面 转入账户
     */
    static transferPlatformEnter = [
        { name: '彩票账户', value: 'lottery', select: false },
        { name: 'AG账户', value: 'ag', select: false },
        { name: 'UG账户', value: 'ug', select: false },
        { name: 'KY棋牌', value: 'ky', select: false },
        { name: 'EBET账户', value: 'ebet', select: false },
    ];
    /**
     * @params 计算小数乘法
     * @param author David 2019-11-11
     */
    public accMul(arg1, arg2) {
        let m = 0;
        const s1 = arg1 + '';
        const s2 = arg2 + '';
        // tslint:disable-next-line: semicolon
        try { m += s1.split('.')[1].length } catch (e) { }
        // tslint:disable-next-line: semicolon
        try { m += s2.split('.')[1].length } catch (e) { }
        return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
    }
    /**
     * @params 分页
     * @param author David 2019-11-11
     */
    public PageIndex() {
        return 1;
    }
    /**
     * @params 分页
     * @param author David 2019-11-11
     */
    public PageSize() {
        return 30;
    }

    /**
     * @params 当前日期
     * @param author David 2019-10-01
     */
    public startNowDate() {
        const date = new Date();
        const month = date.getMonth() + 1;
        let m = '';
        let d = '';
        const strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            m = '0' + month;
        } else {
            m = month + '';
        }
        if (strDate >= 0 && strDate <= 9) {
            d = '0' + strDate;
        } else {
            d = '' + strDate;
        }
        return date.getFullYear() + '-' + m + '-' + d;
    }
    /**
     * @params 结束日期
     * @param author David 2019-10-01
     */
    public endDate() {
        const date = new Date();
        // date.setDate(date.getDate() + 1);
        date.setDate(date.getDate());
        const month = date.getMonth() + 1;
        let m = '';
        let d = '';
        const strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            m = '0' + month;
        } else {
            m = month + '';
        }
        if (strDate >= 0 && strDate <= 9) {
            d = '0' + strDate;
        } else {
            d = '' + strDate;
        }
        return date.getFullYear() + '-' + m + '-' + d;
    }
}
