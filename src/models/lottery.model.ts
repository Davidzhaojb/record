
export class IntegrateLottertAllArr {
    code: string;
    name: string;
    plays: LotteryModel[];
}

/**
 * 开奖号码
 * evan 2018-09-18
 */
export class LotteryOpenModel {
    ID: number;                                 //  开奖管理主键;
    LotteryCode: string;                        //  彩票代码。彩种表【Lottery】的外键
    LotteryOpenNo: string;                      //  开奖号码
    IssueNo: string;                            //  开奖期号
    OpenTime: string;                           //  开奖时间
    AddTime: string;                            //  开奖号码
    State: string;                              //  状态
}


export class BrickTypeModel {
    constructor() {
        this.brickTypeCode = null;
        this.brickTypeName = null;
        this.className = null;
    }
    brickTypeCode: string;
    brickTypeName: string;
    className: string;
}

/**
 * 获取所有彩种
 * An 2019-08-01
 */
export class LotteryModel {
    constructor() {
        this.LotteryType = null;
        this.LotteryTypeName = null;
        this.OpenLength = null;
        this.NumLength = null;
        this.LotteryPlayModeCode = null;
        this.LotteryPlayModeName = null;
        this.PlayMode = null;
        this.PlayModes = [];
        this.HasMorePlayModeType = null;
        this.ID = null;
        this.LotteryCode = null;
        this.LotteryName = null;
        this.LotteryTypeCode = null;
        this.State = null;
        this.SerialsID = null;
        this.Propertys = null;
        this.IsAuto = null;
        this.IsNew = null;
        this.IsFire = null;
        this.IsHot = null;
        this.IsRecommend = null;
        this.RecommendSerials = null;
        this.RewardUp = null;
        this.RewardDown = null;
        this.BlockTime = null;
        this.OfficialWeb = null;
        this.LotteryOpen = [];
        this.LotteryPlayMode = [];
    }
    /** 彩票类别 */
    LotteryType: string;
    /** 彩票类别名称 */
    LotteryTypeName: string;
    /** 开奖号码长度 */
    OpenLength: number;
    /** 数字长度 */
    NumLength: number;
    /** 玩法分类编码 */
    LotteryPlayModeCode: string;
    /** 玩法分类名称 */
    LotteryPlayModeName: string;
    /** 玩法分类 */
    PlayMode: LotteryPlayMode;
    /** 玩法分类集合 */
    PlayModes: LotteryPlayMode[];
    /** 0表示只有官方玩法，1表示除了官方玩法外还有信用玩法。 */
    HasMorePlayModeType: number;
    /** 彩票ID */
    ID: number;
    /** 彩票代码 */
    LotteryCode: string;
    /** 彩票名称 */
    LotteryName: string;
    /** 彩票类别代码 */
    LotteryTypeCode: string;
    /** 状态 */
    State: string;
    /** 排序ID */
    SerialsID: number;

    Propertys: string;
    /** 是否自主开奖 */
    IsAuto: boolean;
    /** 是否新彩种 */
    IsNew: boolean;
    /** 是否火爆彩种 */
    IsFire: boolean;
    /** 是否热门彩种 */
    IsHot: boolean;
    /** 是否热门彩种推荐 */
    IsRecommend: boolean;
    /** 热门推荐排序 */
    RecommendSerials: number;
    /** 奖金上限 */
    RewardUp: number;
    /** 奖金下限 */
    RewardDown: number;
    /** 封单时间，秒（Marc） */
    BlockTime: number;
    /** 官方网址 */
    OfficialWeb = null;
    /** 开奖号码 */
    LotteryOpen: LotteryOpen[];
    /** 玩法分类 */
    LotteryPlayMode: LotteryPlayMode[];
}


/**
 * 彩种类型
 * An 2019-08-01
 */
export class LotteryTypeModel {
    constructor() {
        this.LotteryTypeCode = null;
        this.LotteryTypeName = null;
        this.OrderId = null;
        this.Status = null;
    }
    /** 彩票类别代码 */
    LotteryTypeCode: string;
    /** 彩票类型名称 */
    LotteryTypeName: string;
    OrderId: number;
    Status: number;
}


/**
 * 彩种
 * An 2019-08-01
 */
export class BrickExtendModel {
    constructor() {
        this.LotteryType = null;
        this.LotteryTypeName = null;
        this.OpenLength = null;
        this.NumLength = null;
        this.LotteryPlayModeCode = null;
        this.LotteryPlayModeName = null;
        this.HasMorePlayModeType = null;
        this.ID = null;
        this.LotteryCode = null;
        this.LotteryName = null;
        this.LotteryTypeCode = null;
        this.State = null;
        this.SerialsID = null;
        this.Propertys = null;
        this.IsAuto = null;
        this.IsNew = null;
        this.IsFire = null;
        this.IsHot = null;
        this.IsRecommend = null;
        this.RecommendSerials = null;
        this.RewardUp = null;
        this.RewardDown = null;
        this.BlockTime = null;
        this.OfficialWeb = null;
        this.PlayMode = null;
        this.PlayModes = [];
        this.LotteryOpen = [];
        this.LotteryPlayMode = [];
    }
    /** 彩票类别代码 */
    LotteryType: string;
    /** 彩票类别名称 */
    LotteryTypeName: string;
    /** 开奖号码长度 */
    OpenLength: number;
    /** 数字长度 */
    NumLength: number;
    /** 玩法分类编码 */
    LotteryPlayModeCode: string;
    /** 玩法分类名称 */
    LotteryPlayModeName: string;
    /** 0表示只有官方玩法，1表示除了官方玩法外还有信用玩法。 */
    HasMorePlayModeType: number;
    /** 彩票ID。主键ID */
    ID: number;
    /** 彩票代码 */
    LotteryCode: string;
    /** 彩票名称 */
    LotteryName: string;
    /** 彩票类别代码。值来自表【LotteryType】的字段【LotteryTypeCode】 */
    LotteryTypeCode: string;
    /** 状态 */
    State: string;
    /** 排序 */
    SerialsID: number;
    /** 是否自主开奖 */
    Propertys: string;
    IsAuto: boolean;
    /** 是否新的 */
    IsNew: boolean;
    /** 是否火爆 */
    IsFire: boolean;
    /** 是否热 */
    IsHot: boolean;
    /** 是否热门推荐彩种 */
    IsRecommend: boolean;
    /** 热门推荐排序 */
    RecommendSerials: number;
    /** 奖金上限 */
    RewardUp: number;
    /** 奖金下限 */
    RewardDown: number;
    /** 封单时间，秒（Marc） */
    BlockTime: number;
    /** 官方网址 */
    OfficialWeb: string;
    PlayMode: LotteryPlayMode;
    PlayModes: LotteryPlayMode[];
    LotteryOpen: LotteryOpen[];
    LotteryPlayMode: LotteryPlayMode[];
}



/**
 * 玩法明细
 * evan 2018-09-18
 */
export class LotteryPlayDetailModel {
    constructor() {
        this.ID = -1;
        this.LotteryPlayDetailCode = null;
        this.LotteryPlayDetailName = null;
        this.LotteryPlayModeCode = null;
        this.State = null;
        this.SerialsID = -1;
        this.AlgorithmCode = null;
        this.CardinalMoney = -1;
        this.Modulus = -1;
        this.CardinalMoney1 = -1;
        this.Modulus1 = -1;
        this.LimitBet = -1;
        this.IsRewardFixed = false;
        this.IsAttached = null;
        this.PlayGroup = null;
        this.DisableLotteryCodes = null;
        this.Position = null;
    }
    ID: number;                                                  // 彩票玩法明细主键
    LotteryPlayDetailCode: string;                               // 玩法明细代码
    LotteryPlayDetailName: string;                               // 玩法明细名称
    LotteryPlayModeCode: string;                                 // 彩票玩法代码。玩法分类表【LotteryPlayMode】的外键
    State: string;                                               // 状态
    SerialsID: number;                                           // 排序
    AlgorithmCode: string;                                       // 算法代码。算法表【Algorithm】的外键
    CardinalMoney: number;                                       // 基数金钱
    Modulus: number;                                             // 系数
    CardinalMoney1: number;                                      // 基数金钱1
    Modulus1: number;                                            // 系数1
    LimitBet: number;                                            // 限注数
    IsRewardFixed: boolean;                                      // 是否固定奖金
    IsAttached: string;                                          // 是否扩展奖金
    PlayGroup: string;                                           // 玩法明细分组
    DisableLotteryCodes: string;
    Position: string;                                            // 投注位置
    Algorithm: AlgorithmModel;                                   // 对于算法
    PlayDetailAttacheds: PlayDetailAttachedModel[];              // 玩法明细附加信息：中奖等级
}


/**
 * 算法明细
 * evan 2018-09-18
 */
export class AlgorithmModel {
    ID: number;                                                    // 算法表主键
    AlgorithmCode: string;                                         // 算法代码
    AlgorithmName: string;                                         // 算法名称
    SerialsID: number;                                             // 排序
    AlgorithmTypeCode: string;                                     // 算法类别代码
    BetNumLength: number;                                          // 投注长度
    TipInfo: string;                                               // 提示信息
    PickExample: string;                                           // 序号实例
    AlgorithmType: AlgorithmTypeModel;                             // 算法类别
}


/**
 * 算法类别
 * evan 2018-09-18
 */
export class AlgorithmTypeModel {
    constructor() {
        this.ID = 0;
        this.PickMode = '01';
    }

    ID: number;                                                   // 算法类别主键
    AlgorithmTypeCode: number;                                    // 算法类别代码
    AlgorithmTypeName: number;                                    // 算法类别名称
    State: number;                                                // 状态
    LotteryTypeCode: number;                                      // 彩票类别代码
    SerialsID: number;                                            // 排序
    PickMode: string;                                      // 选号模式
    CanCommonRan: number;                                         // 能否常规任选
}


/**
 * 玩法明细附加信息：中奖等级
 * evan 2018-09-18
 */
export class PlayDetailAttachedModel {
    ID: number;
    /**
     * 中奖等级名称
     *  type {string}
     *  memberof PlayDetailAttachedModel
     */
    NumKey: string;
    /**
     * 玩法明细表【LotteryPlayDetail】的外键
     *  type {string}
     *  memberof PlayDetailAttachedModel
     */
    LotteryPlayDetailCode: string;
    /**
     * 中奖金额
     *  type {number}
     *  memberof PlayDetailAttachedModel
     */
    CardinalMoney: number;
    /**
     * 系数 倍数
     *  type {number}
     *  memberof PlayDetailAttachedModel
     */
    Modulus: number;
    /**
     * 排序ID
     *  type {number}
     *  memberof PlayDetailAttachedModel
     */
    SerialsID: number;
}

/**
 *  期号实体
 */
export class IssueModel {
    constructor() {
        this.CurrentIssueNo = null;
        this.PreviewIssueNo = null;
        this.RemainTime = null;
        this.Seconds = null;
        this.Frequency = null;
        this.Issue = new NextIssueModel();
    }

    /**
     * 当前期号
     *  type {string}
     *  memberof IssueModel
     */
    CurrentIssueNo: string;
    /**
     * 上期期号
     *  type {string}
     *  memberof IssueModel
     */
    PreviewIssueNo: string;
    /**
     * 剩余封单时间
     *  type {number}
     *  memberof IssueModel
     */
    RemainTime: number;
    /**
     * 秒
     * type {number}
     * memberof IssueModel
     */
    Seconds: number;
    /**
     * 开奖频率即多长时间开奖一次 单位秒
     * type {number}
     * memberof IssueModel
     */
    Frequency: number;          //
    /**
     * 期号 -下一期期号信息
     *
     * type {NextIssueModel}
     * memberof IssueModel
     */
    Issue: NextIssueModel;
}

export class NextIssueModel {
    constructor() {
        this.IssueNo = null;
        this.BeginTime = null;
        this.EndTime = null;
        this.BeginTime1 = null;
        this.EndTime1 = null;
        this.LotteryCode = null;
        this.MaxIssue = null;
        this.MinIssue = null;
        this.Crossdays = null;
        this.LotteryTypeCode = null;
        this.NowIssueDay = null;
    }
    IssueNo: string;
    BeginTime: string;
    EndTime: string;
    BeginTime1: string;
    EndTime1: string;
    LotteryCode: string;
    MaxIssue: number;
    MinIssue: number;
    Crossdays: boolean;
    LotteryTypeCode: string;
    NowIssueDay: string;
}

/**
 * 投注选号需要的必要参数 在投注前初始化
 * evan 2018-10-10
 * export
 * class BettingMethodParams
 */
export class BettingMethodParams {
    /**
     * 选位配置  如万位，千位，百位，十位，个位等
     * evan 2018-10-10
     * type {CheckedItemModel[]}
     * memberof BettingMethodParams
     */
    medianList: CheckedItemModel[] = [];

    /**
     * 玩法选泽 可以投注的号码选择 如0到9的数字，0到11的数字等
     * evan 2018-10-10
     * type {CheckedItemModel[][]}
     * memberof BettingMethodParams
     */
    numList: CheckedItemModel[][] = [];

    /**
     * 快捷选中操作命名 大，小，单，双，清 全
     * evan 2018-10-10
     * type {CheckedItemModel[][]}
     * memberof BettingMethodParams
     */
    commandList: CheckedItemModel[][] = [];

    /**
     * 当前用户选中的位数（万位，千位，百位，十位，个位）集合
     * evan 2018-10-10
     * type {CheckedItemModel[]}
     * memberof BettingMethodParams
     */
    checkedList: CheckedItemModel[] = [];


    /**
     * 获取对应的位数，和对应的投注号码 eg：万位：245
     * evan 2018-10-10
     * type {CheckedItemModel[][]}
     * memberof BettingMethodParams
     */
    dataSelected: CheckedItemModel[][] = [];

    /**
     * 投注总量 即投多少注数
     * evan 2018-10-10
     * type {number}
     * memberof BettingMethodParams
     */
    bettingCount: number;

    /**
     * 是否任选位
     * evan 2018-10-10
     *  type {boolean}
     *  memberof BettingMethodParams
     */
    anyChoose: boolean;

    /**
     * 单式投注数据集合
     * evan 2018-11-29
     *  type {string[]}
     *  memberof BettingMethodParams
     */
    bettingNumberArray: string[] = [];

    /**
     * 单式投注数据字符串
     * evan 2018-11-29
     * type {string}
     * memberof BettingMethodParams
     */
    bettingNumberString: string;

}

export class CheckedItemModel {
    constructor() {
        this.index = -9999;
    }
    name: string;
    checked: boolean;
    index: number;
    place: string;
}

/**
 * 投注页面投注信息记录及保存操作
 * evan 2018-10-14
 * export
 * class BettingCountModel
 */
export class BettingCountModel {
    constructor() {
        this.betNumLength = -1;
    }
    dataSelected: CheckedItemModel[][] = [];
    lotteryTypeCode: string;
    checkedList: CheckedItemModel[] = [];
    algorithmTypeCode: string;
    betNumLength: number;
    anyChoose: boolean;
    bettingNumberArray: string[] = [];
    bettingNumberString: string;
}

export class ReturnResult {
    Error: string;
    Parameter: string;
    Result: boolean;
}

/**
 * 投注模式实体对象类
 * evan 2018-10-14
 * export
 *  class MoneyModel
 */
export class MoneyModel {
    constructor() {
        this.value = 1;
    }
    id: number; // 默认元模式
    value: number;
    name: string;
    checked: boolean;
}

/**
 * 投注信息
 *
 * export
 *  class BettingModel
 */
export class BettingModel {
    ruleName: string;
    BettingCount: number;
    multiple: number;
    moneyMode: MoneyModel = null;
    isRewardFixed: boolean;
    perBettingPrice: number;
    /**
     * 彩种编码
     */
    LotteryCode: string;
    /**
     * 投注期号信息
     */
    IssueNo: string;
    /**
     * 玩法明细编码
     */
    LotteryPlayDetailCode: string;
    /**
     * 选位
     */
    SelectMedian: string;
    /**
     * 投注金额
     */
    BettingMoney: number;
    /**
     *
     */
    GraduationCount: number;
    /**
     * 投注号码
     */
    BettingNumber: string;
    /**
     * 是否追号
     */
    IsChaseNo: boolean;
    /**
     * 追号期数
     */
    BuyIssueCount: number;
    /**
     * 中奖后是否停止追号
     */
    IsStopAfterWinning: boolean;
    /**
     * 投注期号（以及追号期号）
     */
    //  BettingInfoIssueList: BettingInfoIssueModel[] = [];
    /**
     * 是否IM投注
     */
    IsImBetting: boolean;
    /**
     * 群组编码
     */
    GroupCode: string;
}

/**
 *
 *
 * export
 *  class BettingDataModel
 */
export class BettingDataModel {
    constructor() { }
    playModeType: number;
    bettingList: BettingModel[] = [];
    inputLottery: LotteryModel = new LotteryModel();
    inputPlayModeDetail: LotteryPlayDetailModel = new LotteryPlayDetailModel();
    currIssue: IssueModel = new IssueModel();
    playDetail: LotteryPlayMode = new LotteryPlayMode();
    adjustReward: number;
    rewardUp: number;
    rewardDown: number;
    baseReward: number;
    currUserMoney: number;
    bettingCount: number;
    moneyModel: MoneyModel;
    PerBettingPrice: number;
    Multiple: number;
    RewardPar: number;
}



export class LotteryPlayMode {
    constructor() {
        this.ID = null;
        this.LotteryPlayModeCode = null;
        this.LotteryPlayModeName = null;
        this.LotteryCode = null;
        this.State = null;
        this.SerialsID = null;
        this.IsSelect = true;
        this.LotteryTypeCode = null;
        this.DisableLotteryCodes = null;
        this.PlayModeType = null;
        this.LotteryPlayModeTypeCode = null;
        this.PlayDetails = [];
    }
    /** 主键ID */
    ID: number;
    /** 彩票玩法代码 */
    LotteryPlayModeCode: string;
    /** 彩票玩法名称 */
    LotteryPlayModeName: string;
    /** 彩票代码 */
    LotteryCode: string;
    /** 状态 */
    State: string;
    /** 排序 */
    SerialsID: number;
    /** 是否选中。true：默认选中的玩法 */
    IsSelect: boolean;
    /** 所属的彩种分类编码，表[LotteryType] 的外键 */
    LotteryTypeCode: string;
    DisableLotteryCodes: string;
    /** 玩法分类的类型 */
    PlayModeType: number;
    /** 块钱中的LotteryPlayModeTypeCode */
    LotteryPlayModeTypeCode: number;
    /** 玩法明细 */
    PlayDetails: LotteryPlayDetail[];

}

/**
 * 玩法明细
 * An 2019-08-01
 */
export class LotteryPlayDetail {
    constructor() {
        this.ID = null;
        this.LotteryPlayDetailCode = null;
        this.LotteryPlayDetailName = null;
        this.LotteryPlayModeCode = null;
        this.State = null;
        this.SerialsID = null;
        this.AlgorithmCode = null;
        this.CardinalMoney = null;
        this.Modulus = null;
        this.CardinalMoney1 = null;
        this.Modulus1 = null;
        this.LimitBet = null;
        this.IsRewardFixed = null;
        this.IsAttached = null;
        this.PlayGroup = null;
        this.DisableLotteryCodes = null;
        this.Position = null;
        this.Algorithm = null;
        this.PlayDetailAttacheds = [];
    }
    /** 彩票玩法明细主键 */
    ID: number;
    /** 玩法明细代码 */
    LotteryPlayDetailCode: string;
    /** 玩法明细名称 */
    LotteryPlayDetailName: string;
    /** 彩票玩法代码。玩法分类表【LotteryPlayMode】的外键 */
    LotteryPlayModeCode: string;
    /** 状态 */
    State: string;
    /** 排序 */
    SerialsID: number;
    /** 算法代码。算法表【Algorithm】的外键 */
    AlgorithmCode: string;
    /** 基数金钱 */
    CardinalMoney: number;
    /** 系数 */
    Modulus: number;
    /** 基数金钱1 */
    CardinalMoney1: number;
    /** 系数1 */
    Modulus1: number;
    /** 限注数 */
    LimitBet: number;
    /** 是否固定奖金 */
    IsRewardFixed: boolean;
    /** 是否扩展奖金 */
    IsAttached: boolean;
    PlayGroup: string;
    /** 玩法明细分组 */
    DisableLotteryCodes: string;
    /** 投注位置 */
    Position: string;
    /** 玩法明细对应算法 */
    Algorithm: Algorithm;
    /** 玩法明细附加信息：中奖等级 */
    PlayDetailAttacheds: LotteryPlayDetailAttached[];
}

/**
 * 玩法明细对应算法
 * An 2019-08-01
 */
export class Algorithm {
    constructor() {
        this.ID = null;
        this.AlgorithmCode = null;
        this.AlgorithmName = null;
        this.SerialsID = null;
        this.AlgorithmTypeCode = null;
        this.BetNumLength = null;
        this.TipInfo = null;
        this.PickExample = null;
        this.AlgorithmType = null;
        this.LotteryPlayDetail = [];
    }
    /** 算法表主键 */
    ID: number;
    /** 算法代码 */
    AlgorithmCode: string;
    /** 算法名称 */
    AlgorithmName: string;
    /** 排序 */
    SerialsID: number;
    /** 算法类别代码。表【AlgorithmType】的字段值【AlgorithmTypeCode】，外键 */
    AlgorithmTypeCode: string;
    /** 投注长度 */
    BetNumLength: number;
    /** 提示信息 */
    TipInfo: string;
    /** 选号示例 */
    PickExample: string;
    /** 算法类别 */
    AlgorithmType: AlgorithmType;
    /** 玩法明细 */
    LotteryPlayDetail: LotteryPlayDetail[];
}

/**
 * 算法类别
 * An 2019-08-01
 */
export class AlgorithmType {
    constructor() {
        this.ID = null;
        this.AlgorithmTypeCode = null;
        this.AlgorithmTypeName = null;
        this.State = null;
        this.LotteryTypeCode = null;
        this.SerialsID = null;
        this.PickMode = null;
        this.CanCommonRan = null;
        this.Algorithm = [];
    }
    /** 算法类别主键 */
    ID: number;
    /** 算法类别代码 */
    AlgorithmTypeCode: string;
    /** 算法类别名称 */
    AlgorithmTypeName: string;
    /** 状态 */
    State: string;
    /** 彩票类别代码。值来自表【LotteryType】的字段【LotteryTypeCode】 */
    LotteryTypeCode: string;
    /** 排序 */
    SerialsID: number;
    /** 选号模式 */
    PickMode: string;
    /** 能否常规任选 */
    CanCommonRan: string;
    /** 算法集合 */
    Algorithm: Algorithm[];
}

/**
 * 玩法明细附加信息
 * An 2019-08-01
 */
export class LotteryPlayDetailAttached {
    constructor() {
        this.ID = null;
        this.NumKey = null;
        this.LotteryPlayDetailCode = null;
        this.CardinalMoney = null;
        this.Modulus = null;
        this.SerialsID = null;
    }
    /** 主键ID */
    ID: number;
    /** 中奖等级名称 */
    NumKey: string;
    /** 玩法明细表【LotteryPlayDetail】的外键 */
    LotteryPlayDetailCode: string;
    /** 中奖金额 */
    CardinalMoney: number;
    /** 系数 */
    Modulus: number;
    /** 排序 */
    SerialsID: number;
}


/**
 * 开奖号码
 * An 2019-08-01
 */
export class LotteryOpen {
    constructor() {
        this.ID = null;
        this.LotteryCode = null;
        this.LotteryOpenNo = null;
        this.IssueNo = null;
        this.OpenTime = null;
        this.AddTime = null;
        this.State = null;
    }
    /** 开奖管理主键 */
    ID: number;
    /** 彩票代码。彩种表【Lottery】的外键 */
    LotteryCode: string;
    /** 开奖号码 */
    LotteryOpenNo: string;
    /** 期号 */
    IssueNo: string;
    /** 开奖时间 */
    OpenTime: string;
    /** 添加时间 */
    AddTime: string;
    /** 状态 */
    State: string;
}


