export class UserModel {
    constructor() {
        this.ID = null;
        this.UserName = null;
        this.ParentUserName = null;
        this.Bonus = null;
        this.UserType = null;
        this.UserTypeName = null;
        this.UserLeve = null;
        this.UserLeveName = null;
        this.UserMoney = null;
        this.UserLockMoney = null;
        this.UserIntegral = null;
        this.State = null;
        this.LoginIP = null;
        this.LoginGuid = null;
        this.TryLogCnt = null;
        this.RegistTime = null;
        this.CanDailyWages = null;
        this.HasDailyWages = null;
        this.GASecret = null;
    }
    /**
     * @params 用户ID
     */
    ID: number;
    /**
     * @params 登录用户名
     */
    UserName: string;
    /**
     * @params 上级用户名
     */
    ParentUserName: string;
    /**
     * @params 奖金
     */
    Bonus: number;
    /**
     * @params 用户类型代号，0表示会员
     */
    UserType: string;
    /**
     * @params 用户类型名称，“会员”的代码是0
     */
    UserTypeName: string;
    /**
     * @params 用户级别代号。01表示普通
     */
    UserLeve: string;
    /**
     * @params 用户级别名称。“普通”的代码是01
     */
    UserLeveName: string;
    /**
     * @params 用户余额
     */
    UserMoney: number;
    /**
     * @params 冻结金额
     */
    UserLockMoney: number;
    /**
     * @params 用户积分
     */
    UserIntegral: number;
    /**
     * @params
     */
    State: string;
    /**
     * @params 登录的ip地址
     */
    LoginIP: string;
    /**
     * @params
     */
    LoginGuid: string;
    /**
     * @params
     */
    TryLogCnt: number;
    /**
     * @params 注册时间
     */
    RegistTime: string;
    /**
     * @params 能否启用日工资
     */
    CanDailyWages: boolean;
    /**
     * @params 是否启用日工资
     */
    HasDailyWages: boolean;
    /**
     * @params 登录生成的token
     */
    GASecret: string;
}


export class SysconfigModel {
    constructor() {
        this.ID = null;
        this.MinBonus = null;
        this.MaxBonus = null;
        this.LimitUserName = null;
        this.RewardUp = null;
        this.RewardDown = null;
        this.PerGraduation = null;
        this.BonusGruduation = null;
        this.BasicReward = null;
        this.AdjustMaxBonus = null;
        this.AdjustMinBonus = null;
        this.PerBettingPrice = null;
        this.PerMaxReward = null;
        this.MaxMultiple = null;
        this.MinMultiple = null;
        this.CanDecimal = null;
        this.DefaultMultiple = null;
        this.LatestRevotion = null;
        this.MaxWithDraw = null;
        this.MinWithDraw = null;
        this.WithDrawTimes = null;
        this.StartWithDrawTime = null;
        this.EndWithDrawTime = null;
        this.StartWithDrawTime1 = null;
        this.EndWithDrawTime1 = null;
        this.ClientMaxBonus = null;
        this.ClientMinBonus = null;
        this.ClientGraduation = null;
        this.DefaultLess = null;
        this.DefaultOutLineOfTime = null;
        this.DefaultOnlineNumber = null;
        this.OnlineNumberMultiple = null;
        this.QueuePerson = null;
        this.DrawCashCommt = null;
        this.AutoLotteryProportion = null;
        this.IsAutoLotteryOpen = null;
        this.LateOpenMiinute = null;
        this.IsTotalCanBetting = null;
        this.MaxUserBonusCanBetting = null;
        this.MaxChaseIssue = null;
        this.IsOpenOnlineNumber = null;
        this.HotBattleDisplay = null;
        this.ProxySendMsg = null;
        this.ClientVersion = null;
        this.CustomerServiceUrl = null;
        this.IsQueueService = null;
        this.QueueNum = null;
        this.CustomerServiceMode = null;
        this.CanAdjust = null;
        this.FixedRewardMode = null;
        this.OpenTotal = null;
        this.TotalNum = null;
        this.IsOpenMachine = null;
        this.RecentOpenNum = null;
        this.IsYuanJiaoFen = null;
        this.JiaoMaxMode = null;
        this.FenMaxMode = null;
        this.AdjustShowMaxMode = null;
        this.BettingIssueAlert = null;
        this.IssueAlertTime = null;
        this.OpenIssueAlertTime = null;
        this.TestUserStaticLotteryRank = null;
        this.AutoLotteryKoProprotion = null;
        this.TransferReward = null;
        this.NewUserLinkBonus = null;
        this.WithdrawMinPercent = null;
        this.DaySalaryMode = null;
        this.CdnPath = null;
        this.Debug = null;
    }
    /**
     * @params 主键ID
     */
    ID: number;
    /**
     * @params 最小返点
     */
    MinBonus: number;
    /**
     * @params 最大返点
     */
    MaxBonus: number;
    /**
     * @params 限制注册用户名列表。以,分隔
     */
    LimitUserName: string;
    /**
     * @params 奖金上限
     */
    RewardUp: number;
    /**
     * @params 奖金下限
     */
    RewardDown: number;
    /**
     * @params 调节刻度
     */
    PerGraduation: number;
    /**
     * @params 返点刻度
     */
    BonusGruduation: number;
    /**
     * @params 基数奖金
     */
    BasicReward: number;
    /**
     * @params 调节允许最大返点
     */
    AdjustMaxBonus: number;
    /**
     * @params 调节允许最小返点
     */
    AdjustMinBonus: number;
    /**
     * @params 单注金额
     */
    PerBettingPrice: number;
    /**
     * @params 单注最大奖金
     */
    PerMaxReward: number;
    /**
     * @params 最大倍数
     */
    MaxMultiple: number;
    /**
     * @params 最小倍数
     */
    MinMultiple: number;
    /**
     * @params 能否小数
     */
    CanDecimal: boolean;
    /**
     * @params 默认倍数
     */
    DefaultMultiple: number;
    /**
     * @params 撤单封单时间
     */
    LatestRevotion: number;
    /**
     * @params 最大提款
     */
    MaxWithDraw: number;
    /**
     * @params 最小提款
     */
    MinWithDraw: number;
    /**
     * @params 提款次数
     */
    WithDrawTimes: number;
    /**
     * @params 提现开始时间
     */
    StartWithDrawTime: Date;
    /**
     * @params 提现结束时间
     */
    EndWithDrawTime: Date;
    /**
     * @params 提现开始时间1
     */
    StartWithDrawTime1: Date;
    /**
     * @params 提现结束时间1
     */
    EndWithDrawTime1: Date;
    /**
     * @params 前台开户最大返点
     */
    ClientMaxBonus: number;
    /**
     * @params 前台开户最小返点
     */
    ClientMinBonus: number;
    /**
     * @params 前台返点调节刻度
     */
    ClientGraduation: number;
    /**
     * @params 默认差值
     */
    DefaultLess: number;
    DefaultOutLineOfTime: number;
    DefaultOnlineNumber: number;
    OnlineNumberMultiple: number;
    /**
     * @params 排队人数
     */
    QueuePerson: number;
    /**
     * @params 提现说明
     */
    DrawCashCommt: string;
    /**
     * @params 自主开奖最小利润比例
     */
    AutoLotteryProportion: number;
    /**
     * @params 自主开号是否开启
     */
    IsAutoLotteryOpen: boolean;
    /**
     * @params 延迟开奖时间
     */
    LateOpenMiinute: number;
    /**
     * @params 总代是否可以投资
     */
    IsTotalCanBetting: boolean;
    /**
     * @params 最大允许投注最大用户返点
     */
    MaxUserBonusCanBetting: number;
    MaxChaseIssue: number;
    /**
     * @params 是否开启在线人数
     */
    IsOpenOnlineNumber: boolean;
    /**
     * @params 最热赛事显示
     */
    HotBattleDisplay: string;
    /**
     * @params 代理发送消息配置
     */
    ProxySendMsg: string;
    /**
     * @params 客户端版本
     */
    ClientVersion: string;
    /**
     * @params 客服地址
     */
    CustomerServiceUrl: string;
    /**
     * @params 客服是否排队
     */
    IsQueueService: boolean;
    /**
     * @params 排队人数
     */
    QueueNum: number;
    /**
     * @params 客服模式
     */
    CustomerServiceMode: string;
    /**
     * @params 能否自由调节
     */
    CanAdjust: boolean;
    /**
     * @params 固定奖金模式
     */
    FixedRewardMode: number;
    OpenTotal: boolean;
    TotalNum: number;
    IsOpenMachine: boolean;
    /**
     * @params 最近开奖显示数目
     */
    RecentOpenNum: number;
    IsYuanJiaoFen: boolean;
    JiaoMaxMode: number;
    FenMaxMode: number;
    /**
     * @params 自由调节是否显示最高奖
     */
    AdjustShowMaxMode: boolean;
    BettingIssueAlert: boolean;
    IssueAlertTime: number;
    OpenIssueAlertTime: boolean;
    TestUserStaticLotteryRank: boolean;
    /**
     * @params 自有彩种杀号概率
     */
    AutoLotteryKoProprotion: number;
    TransferReward: number;
    NewUserLinkBonus: number;
    WithdrawMinPercent: number;
    DaySalaryMode: string;
    CdnPath: string;
    Debug: boolean;
}

